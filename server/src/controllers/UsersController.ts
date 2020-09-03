import {Request , Response} from 'express';
import db from '../database/conection';
import bcrypt, { hash } from "bcryptjs";
import  jwt from "jsonwebtoken";

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
            
            const user = await  trx('usuarios').insert({
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
        const {
            email,
            password
        } = request.body;

        console.log (email,password);
        try {
            const user = await db('usuarios')
                            .where('usuarios.email','=',String(email))
                            .select()
                            .then(result=>result[0])

            if (await bcrypt.compare(password , user.password)){
            
                const token = jwt.sign({ id: user.id}, "secret", {
                    expiresIn: 86400
                });
                response.json({user , token})
            }else{
                response.send(400).json({error:"falha ao autenticar"})
            }
        } catch (error) {
            response.json(null)
        }



        return response.json({email,password});

    }



}