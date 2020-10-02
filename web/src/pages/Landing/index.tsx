import React, { useState , useEffect,useContext}  from 'react';
import {Link}  from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import PageHeaderUser from '../../components/PageHeaderUser'
import './styles.css';

function Landing(){
    
    const [totalConnections, setTotalConnections ] = useState(0);   
    const {signed} = useContext(AuthContext)
    

    useEffect( ()=>{
        api.get('connections').then(response => {
            console.log (response)
            const { total } = response.data;
            setTotalConnections(total);
            
        })
        

    },[])


    return (

        <div id="page-landing">
            <header>
                {signed ?                    
                        <PageHeaderUser/>
                    : <></>
                }
            </header>           
            
            <div id="page-landing-content" className="container">
           

                <div className="logo-container">
                    <img src={logoImg} alt=""/>
                    <h2>Sua plataforma de estudos online.</h2>

                </div>

                <img 
                    src={landingImg}
                    alt="Plataforma de estudos" 
                    className="hero-image"
                />
                                
            </div>
            <div className="footer">
                <div className="footer-container">
                    <div className="text-footer">
                        <h1>Seja bem-vindo.</h1>
                        <p>O que deseja fazer?</p>                        
                    </div>
                    

                    <span className="total-connections">
                        <p>Total de { totalConnections } conexões <br/> já realizadas</p>
                        {/* <img src={purpleHeartIcon} alt="Coração Roxo"/> */}
                    </span>
                    <div className="buttons-container">
                        <Link to="/study" className="study">
                            <img src={studyIcon} alt="Estudar"/>
                            Estudar
                        </Link>
                        <Link to="/give-classes" className="give-classes">
                            <img src={giveClassIcon} alt="Dar Aulas"/>
                            Dar Aulas
                        </Link>

                    </div>
                </div>                     
                    
            </div>
        </div>

    )
}

export default Landing;