import React from 'react';
import { Link } from 'react-router-dom';

import completedImg  from "../../assets/images/completed.svg"
import './styles.css';

interface CompletedPageProps{    
    title:string,
    subtitle:string,
    textButton:string

}
const CompletedPage: React.FC<CompletedPageProps> = ({title,subtitle,textButton})=>{
    return (
        <div className="completed-page">
             
            <img src={completedImg} alt=""/> 
            <h1 className="title">Cadastro Concluído.</h1> 
            <p className="subTitle"></p> 
            <Link to="/login" className="button"> Fazer Login. </Link>
                        
        </div>
    );
}

export default CompletedPage;