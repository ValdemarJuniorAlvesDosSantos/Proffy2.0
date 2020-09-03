import React from 'react'
import whatsappIcon from "../../assets/images/icons/whatsapp.svg"
import './styles.css'
import api from '../../services/api'


export interface Teacher{
    avatar: string,
    bio:string,
    cost:number,
    id:number,
    user_id:number,
    name:string,
    subject:string,
    whatsapp:string
}
interface TeacherItemProps{
    teacher: Teacher;
}
const TeacherItem:React.FC<TeacherItemProps> = ({teacher})=>{
    function createNewConexion (){
        api.post('connections',{
            user_id: teacher.user_id
        })
    }
    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a 
                    target='noopener noreferrer'
                    onClick={createNewConexion}
                    href={`https://wa.me/55${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                </a>
            </footer>        


        </article>
            
    );
}

export default TeacherItem;