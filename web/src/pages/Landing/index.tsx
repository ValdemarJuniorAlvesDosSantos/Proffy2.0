import React, { useState , useEffect,useContext}  from 'react';
import {Link}  from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import  PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

import './styles.css';
function Landing(){
    
    const [totalConnections, setTotalConnections ] = useState(0);   
    const {logout} = useContext(AuthContext)
    

    useEffect( ()=>{
        api.get('connections').then(response => {
            console.log (response)
            const { total } = response.data;
            setTotalConnections(total);
            
        })
        

    },[])

    function handleLogout(){
        
        logout()
    }

    return (

        <div id="page-landing">

            <button className="buttonLogout" type="button" onClick={handleLogout}>
                
                 <PowerSettingsNew fontSize="inherit"> </PowerSettingsNew>
                 
        </button>

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
                <span className="total-connections">
                    Total de { totalConnections } conexões
                    <img src={purpleHeartIcon} alt="Coração Roxo"/>
                </span>
            </div>
        </div>

    )
}

export default Landing;