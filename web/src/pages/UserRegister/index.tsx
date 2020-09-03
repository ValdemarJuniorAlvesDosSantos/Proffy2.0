import React, { useState } from 'react';
import  VisibilityIcon from '@material-ui/icons/Visibility';
import  VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LogoContainer from '../../components/LogoContainer';
import InputFloatLabel from '../../components/InputFloatLabel';

import './styles.css'
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg'

function UserRegister(){
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [isFiled, setIsFiled] = useState(false)
    const [typeSenha, setTypeSenha] = useState("password")

    function handleToggleVisible(){
          
        if (passwordIsVisible){  
            setPasswordIsVisible(false);
            setTypeSenha("password")   
        }else{            
            setPasswordIsVisible(true);
            setTypeSenha("text")          
        }
        
    }
    function handleSetIsFiled (valores: string[]){
        if (valores.includes('')){
            setIsFiled(false);
        }else{
            setIsFiled(true);
        }
    }
    return (

        <div className="page-user-register">  
                    
            <main>
                 
                <div className="mainContent">
                    <header>
                        <Link to="/" className="backIcon"> 
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                    </header>
                    
                    <h1>Cadastro </h1>
                    <p>Preencha os dados abaixo pra começar.</p>
                    <div className="inputsContainer">
                        <InputFloatLabel label="Nome" name="name" className="inputName" type='textarea'
                            value={nome} 
                            onChange={ (e) =>{ 
                                setNome(e.target.value);
                                handleSetIsFiled([e.target.value,sobrenome,email,password])           
                            }}
                        
                        />
                        <InputFloatLabel label="Sobrenome" name="last_name"
                            value={sobrenome} 
                            onChange={ (e) =>{ 
                                setSobrenome(e.target.value);
                                handleSetIsFiled([e.target.value, nome,email,password]);           
                            }}
                        />
                        <InputFloatLabel label="Email" name="email"  
                            value={email} 
                            onChange={ (e) =>{ 
                                setEmail(e.target.value);
                                handleSetIsFiled([e.target.value, nome,sobrenome,password])           
                            }}
                        
                        />
                        <div className="passwordContainer">
                            <InputFloatLabel label="Senha" name="password"   type={typeSenha}
                                   value={password} 
                                   onChange={ (e) =>{ 
                                       setPassword(e.target.value);
                                       handleSetIsFiled([e.target.value, nome,sobrenome,email])            
                                    }}
                            
                            />                       
                            <button type="button" onClick={handleToggleVisible} className="insideButton">
                                {
                                    passwordIsVisible
                                    ? <VisibilityOffIcon className="passwordButtonIcon"/>
                                    : <VisibilityIcon  className="passwordButtonIcon"/>
                                }
                            </button>
                                                   
                        </div> 

                    </div>
                    <button type="button" className=
                        {   isFiled
                            ? "buttonEntrar insideButtonFiled"
                            : " buttonEntrar "
                        }
                    >
                            Concluir cadastro
                    </button>
                </div>
            </main>
            <LogoContainer/>
        </div>
    );
}

export default UserRegister;