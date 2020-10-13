import {Request , Response, NextFunction} from 'express';
import db from '../database/connection';
import bcrypt, { hash } from "bcryptjs";
import  jwt from "jsonwebtoken"; 
import crypto from "crypto";
import sendEmailReset from "../utils/email"
import convertHoursToMinutes from '../utils/convertHoursToMinutes'
import convertTime  from '../utils/convertTime'
const { promisify } = require("util");

interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}
interface SubjectItem{
    subject: "",
    cost: number,
}

export default class UsersController{
    async index (request: Request,response: Response){
        const {user_id} = request.query;
       
        try{const foundUser = await db('users')
                              .where('users.id','=',String(user_id)).first();
        
            const user={
                email:foundUser.email,
                name:foundUser.name,
                last_name:foundUser.lastName,
                avatar: foundUser.avatar,
                bio:foundUser.bio,
                whatsapp: foundUser.whatsapp,


            }
            const subjects= await db('classes')
                            .where('classes.user_id','=',String(user_id))
                            .select({
                                subject:'classes.subject',
                                cost:'classes.cost'
                            })
            const schedule= await db('user_schedule')
                            .where('user_schedule.user_id','=',String(user_id))
                            .select()
            const scheduleItems = schedule.map((scheduleItem)=>{
                return {week_day:scheduleItem.week_day, from:convertTime(scheduleItem.from),to:convertTime(scheduleItem.to)}
            })
            response.json({user,subjects,schedule:scheduleItems});



        }catch(err){
            response.send(400).json({err})
        }                    

    } 
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
                    lastName:foundUser.lastName,
                    avatar:foundUser.avatar,                    
                    bio:foundUser.bio,
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
                        lastName:foundUser.lastName,
                        avatar:foundUser.avatar,                    
                        bio:foundUser.bio,
                    }, token})
            }else{
                return response.json(null)
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
            
                          
            response.sendStatus(200).json({message:"ok"})
            
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
    async update (request: Request,response: Response){
        const {user_id,name,lastName, bio,avatar, whatsapp, subjects, schedule} = request.body
        console.log(request.body)
        let up = {}
        if (name){
            up = Object.assign(up,{name})
        }
        if (lastName){
            up = Object.assign(up,{lastName})
        }
        if (bio){
            up = Object.assign(up,{bio})
        }
        if (whatsapp){
            up = Object.assign(up,{whatsapp})
        }
        if (avatar){
            up = Object.assign(up,{avatar})
        }
        const trx = await db.transaction();
        try{
            await trx('users')
                    .where('users.id','=',user_id)
                    .update(up);

            if (schedule){
                await trx('user_schedule')
                    .where('user_schedule.user_id','=',user_id)
                    .delete();
                if (schedule.length > 0){
                    const userSchedule = schedule.map((scheduleItem:ScheduleItem)=>{
                        return {
                            user_id,
                            week_day: scheduleItem.week_day,
                            from: convertHoursToMinutes(scheduleItem.from),
                            to: convertHoursToMinutes(scheduleItem.to),
                
                        };
                    })
                
                    await trx('user_schedule').insert(userSchedule);
                }
                

            }else{console.log("olha isso")}
            if (subjects){
                await  trx('classes')
                            .where('classes.user_id','=',user_id)
                            .delete();
            
                const classes = subjects.map((subjectItem:SubjectItem)=>{
                    
                return {
                            user_id,
                            subject : subjectItem.subject,
                            cost : subjectItem.cost
                
                        };            
                
               
                })
                if (subjects !== []){
                    await trx('classes').insert(classes);
                }
            }
            
            trx.commit();            
            return response.send("ok")
        }catch(err){
            trx.rollback();
            console.log(err);
            return response.send(err)
        }
       
    }
    

}