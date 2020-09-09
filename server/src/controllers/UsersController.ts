import {Request , Response, NextFunction} from 'express';
import db from '../database/connection';
import bcrypt, { hash } from "bcryptjs";
import  jwt from "jsonwebtoken"; 


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
            
            const user = await  trx('users_auth').insert({
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

                const foundUser = await db('users_auth')
                            .where('users_auth.id','=',Number(user_id))
                            .select()
                            .then(result=>result[0])

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
            const foundUser = await db('users_auth')
                            .where('users_auth.email','=',String(email))
                            .then(result=>result[0])
            
            
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
                return response.send(400).json({error:"falha ao autenticar"})
            }
        } catch (error) {
            response.json(null)
        }



        return response.json({email,password});

    }

    


}