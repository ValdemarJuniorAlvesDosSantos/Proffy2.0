import React, { useState, useContext  , FormEvent } from 'react'

import {useHistory} from 'react-router-dom'
import  VisibilityIcon from '@material-ui/icons/Visibility'
import  VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import LogoContainer from '../../components/LogoContainer'
import heart from '../../assets/images/icons/purple-heart.svg'
import Input from '../../components/Input';
import AuthContext from '../../contexts/auth';
import './styles.css';
import { Link } from 'react-router-dom';


function LoginPage (){
    const history = useHistory();
    const {authorization} = useContext(AuthContext)
    
    const [save, setSave] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [isFiled, setIsFiled] = useState(false)
    const [typeSenha, setTypeSenha] = useState("password")

   
    
    async function handleAuthorization(e: FormEvent){
        e.preventDefault(); 
        await authorization(email,password,false,save);
        if (window.location.pathname === "/login") {
            history.goBack();
        }  
    }
    
    function handleToggleVisible(){
          
        if (passwordIsVisible){  
            setPasswordIsVisible(false);
            setTypeSenha("password")
        }else{            
            setPasswordIsVisible(true);
            setTypeSenha("text")          
        }
        
    }

    

    return (
        <div id="page-login" >
            <LogoContainer />
            
            <main>
                <div className="mainContent">
                    
                    <form onSubmit={handleAuthorization}>
                    <div className="inputContainer">
                        <h2> Fazer login </h2>
                        

                        
                        <Input label="" name="email"  placeholder="E-mail" className="emailContainer" type={"email"}
                                value={email}
                                onChange={ (e) =>{
                                    setEmail(e.target.value); 
                                    setIsFiled(e.target.value !== '' && password !== '' ) ;                                          
                                }}
                        />
                        <div className="passwordContainer">
                            <Input label="" name="senha"  placeholder="Senha" type={typeSenha}
                                   value={password}
                                   onChange = { (e) =>{ 
                                       
                                       setPassword(e.target.value);                             
                                       setIsFiled(e.target.value !== '' && email !== '' );
                                                 
                                    }}
                            
                            />                       
                            <button type="button" onClick={handleToggleVisible} className={"insideButton"} >
                                {
                                    passwordIsVisible
                                    ? <VisibilityOffIcon className="passwordButtonIcon"/>
                                    : <VisibilityIcon  className="passwordButtonIcon"/>
                                }
                            </button>
                                                  
                        </div> 
                        
                    </div>
                    <div className="options">
                        <div className="cbLembrar">
                            <input type="checkbox" className="checkBoxLembrar" id="checkBoxLembrar"
                                onChange={ () => setSave(!save) }
                            />

                            <label htmlFor="checkBoxLembrar">Lembrar-me</label>   
                        </div>
                        <Link className="esqueciSenha" to="/forgot_password"> Esqueci minha senha </Link>
                    </div>
                    <button  type="submit" className=
                        {   isFiled
                            ? "buttonEntrar insideButtonFiled"
                            : " buttonEntrar "
                        }
                    >
                            Entrar
                    </button>
                    
                    </form>
                    <footer>                    
                        <div className="left">
                                <p> Não tem conta?</p>
                                <Link className="cadastreSe" to="/register"> Cadastre-se </Link>
                        </div>
                        <div className="right">
                            É de graça 
                            <img src={heart} alt=""/>
                        </div>



                    </footer>
                </div>
                
                
            </main>

           
        </div>
    );

}

export default LoginPage;