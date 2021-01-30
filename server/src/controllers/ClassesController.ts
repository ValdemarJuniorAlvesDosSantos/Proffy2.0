import {Request , Response} from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}


export default class ClassesController{
    async index (request: Request,response: Response){
        
        const filters = request.query;
        const subject = filters.subject as string;
        const week_day= filters.week_day as string;
        const time = filters.time as string;
        const page = Number(filters.page);

        if (!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error:"Missing filters to search classes"
             })
        }
        const timeInMinutes = convertHoursToMinutes(time)
        
        const classes = await db('classes')
            .whereExists(function(){
                this.select('user_schedule.*')
                .from('user_schedule')
                .whereRaw('`user_schedule`.`user_id` = `classes`.`user_id`')
                .whereRaw('`user_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`user_schedule`.`from` <= ??', [timeInMinutes])                
                .whereRaw('`user_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject','=', subject)
            .join('users', 'classes.user_id' , '=', 'users.id')
            .select(['classes.*' , 'users.*'])

                
        if (page){
            const inicio = 10*(page-1);
            const fim = inicio + 9;

            return response.json(classes.slice(inicio,fim));
        }else{
            return response.json(classes);
        }
    }
    async create (request: Request,response: Response) {

        const {
            user_id,
            subject,
            cost
        } = request.body;
        
        const trx = await db.transaction();
        try{           
            const insertClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });       
                   
            await trx.commit();
            
            return response.status(201).send();
        }catch(err){
            await trx.rollback();
            console.log(err)
            return response.status(400).json({error:'Unexpected error while creating new class'});
        }

    }

}