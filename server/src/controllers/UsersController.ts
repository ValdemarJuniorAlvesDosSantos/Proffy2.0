import {Request , Response, NextFunction} from 'express';
import db from '../database/connection';
import bcrypt, { hash } from "bcryptjs";
import  jwt from "jsonwebtoken"; 
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendEmailReset from "../utils/email"
const { promisify } = require("util");

export default class UsersController{
    async create (request: Request,response: Response){
        const {
            name,
            lastName,
            email,
            password
        } = request.body;

        const trx = await db.transaction();
        
        try{
            const hashPassword  = await bcrypt.hash(password, 8);
            
            const user = await  trx('users').insert({
                name,
                lastName,
                email,
                password: hashPassword
            });
            
            const user_id = user[0];
            await trx.commit();
            
            
            return response.status(201).send({user_id});

        }catch(err){
            await trx.rollback();
            console.log(err)
            return response.status(400).json({error:'Houve um erro no cadastro do usuário'});
        }

    }
    async auth (request: Request,response: Response){
        if (request.headers.authorization){

            const [scheme, token] = request.headers.authorization.split(" ");
            try{
                const decoded = await promisify(jwt.verify)(token, "secret");
                
                const user_id = decoded.id;

                const foundUser = await db('users')
                            .where('users.id','=',Number(user_id))
                            .select().first();

                return response.json({user:{ 
                    id:foundUser.id,
                    email:foundUser.email,
                    name:foundUser.name,
                    lastName:foundUser.lastName
                 }});
            }catch(error){
                return response.json(null);
            }

        }

        let {
            email,
            password
        } = request.body;

        try {
            const foundUser = await db('users')
                            .where('users.email','=',String(email)).first()
                           
            
            
            if (await bcrypt.compare(password , foundUser.password)){
            
                const token = jwt.sign({ id: foundUser.id}, "secret", {
                    expiresIn: 86400
                });
                
                return response.json({user:{ 
                        id:foundUser.id,
                        email:foundUser.email,
                        name:foundUser.name,
                        lastName:foundUser.lastName
                     }, token})
            }else{
                return response.sendStatus(400).json({error:"falha ao autenticar"})
            }
        } catch (error) {
            response.json(null);
        }



        return response.json({email,password});

    }

    async forgot_password (request: Request,response: Response){
        const email = request.body.email;
        
        try{
            
            const foundUser = await db('users')
                              .where('users.email','=',String(email)).first();

            if (!foundUser){
                return response.send({error: "User not found"});
            }
            const tokenReset = crypto.randomBytes(25).toString("hex");
            const tokenResetExpire = new Date();
            tokenResetExpire.setHours( tokenResetExpire.getHours() + 1);
            await db('users')
                  .where('users.id','=',Number(foundUser.id))
                  .update({tokenReset,tokenResetExpire})
            
            sendEmailReset(foundUser.id, foundUser.email, tokenReset)
            
                          
            response.json({user_id:foundUser.id,tokenReset})
            
        }catch(err){
            response.send({error: "Error on recover password"});
        }

    }
    async reset_password (request: Request,response: Response){
        const {user_id,token,new_password} = request.body
        try{
            const foundUser = await db('users')
                              .where('users.id','=',Number(user_id)).first();
            if (!foundUser){
                return response.json({error: "User not found"});
            }
            if (token !== foundUser.tokenReset ){
                
                return response.json({error: "Token is not valid"});                
            }
            const now = new Date();
            if (foundUser.tokenResetExpire < now ){
                return response.json({error: "Token expired"});
            }
            const hashPassword  = await bcrypt.hash(new_password, 8);
            await db('users')
                  .where('users.id','=',Number(foundUser.id))
                  .update({password:hashPassword}) 

            return response.json({msg:"modificado com sucesso"});

        }catch(err){
            return response.send(err)
        }
    }
    

}