import React from 'react';
import logoIcon from '../../assets/images/logo.svg'
import './styles.css'
function LogoContainer(){
    return (
        <div id="logoContainer">
            <div id="backGroundLogo">    
                <div>                     
                    <img src={logoIcon} alt="Proffy" />
                    <h1>Sua plataforma de estudos online.</h1>                     
                </div>         
            </div>
        </div>

    );
    
}

export default LogoContainer;