import React, { useState,FormEvent } from 'react';
import  VisibilityIcon from '@material-ui/icons/Visibility';
import  VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LogoContainer from '../../components/LogoContainer';
import InputFloatLabel from '../../components/InputFloatLabel';
import api from '../../services/api';
import './styles.css'
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg'
import CompletedPage from '../../components/CompletedPage';

function UserRegister(){
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [isFiled, setIsFiled] = useState(false)
    const [typeSenha, setTypeSenha] = useState("password")
    const [success,setSuccess]= useState(false)
    async function handleCreateUser( e:FormEvent){
        e.preventDefault();
        
        api.post("register",{
            name,
            lastName,
            email,
            password

        }).then((resposta)=>{
            const status = resposta.status
            if (status === 201){                
                setSuccess(true)
            }else{
                alert(resposta.data)
                setSuccess(false)
            }
        }).catch((error)=>{
            alert(error)
        })
        

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
    function handleSetIsFiled (valores: string[]){
        if (valores.includes('')){
            setIsFiled(false);
        }else{
            setIsFiled(true);
        }
    }
    return (
        <>
        {
            success 
            ?
                <CompletedPage title={"Cadastro Concluído."}
                    subtitle= {"Agora você faz parte da plataforma Proffy. \n Tenha uma ótima Experiência "}
                    textButton= {"Fazer Login."}
                />           
            
            :
            <div className="page-user-register">  
                
                
                <main>
                    
                    <div className="mainContent">
                        <header>
                            <Link to="/" className="backIcon"> 
                                <img src={backIcon} alt="Voltar"/>
                            </Link>
                        </header>
                        <form onSubmit={handleCreateUser}>
                        <h1>Cadastro </h1>
                        <p>Preencha os dados abaixo pra começar.</p>
                        <div className="inputsContainer">
                            <InputFloatLabel label="Nome" name="name" className="inputName" type='textarea'
                                value={name} 
                                onChange={ (e) =>{ 
                                    setName(e.target.value);
                                    handleSetIsFiled([e.target.value,lastName,email,password])           
                                }}
                            
                            />
                            <InputFloatLabel label="Sobrenome" name="last_name"
                                value={lastName} 
                                onChange={ (e) =>{ 
                                    setLastName(e.target.value);
                                    handleSetIsFiled([e.target.value, name,email,password]);           
                                }}
                            />
                            <InputFloatLabel label="Email" name="email"  
                                value={email} 
                                onChange={ (e) =>{ 
                                    setEmail(e.target.value);
                                    handleSetIsFiled([e.target.value, name,lastName,password])           
                                }}
                            
                            />
                            <div className="passwordContainer">
                                <InputFloatLabel label="Senha" name="password"   type={typeSenha}
                                    value={password} 
                                    onChange={ (e) =>{ 
                                        setPassword(e.target.value);
                                        handleSetIsFiled([e.target.value, name,lastName,email])            
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
                        <button type="submit" className=
                            {   isFiled
                                ? "buttonEntrar insideButtonFiled"
                                : " buttonEntrar "
                            }
                        >
                                Concluir cadastro
                        </button>
                        </form>
                    </div>
                    
                </main>
                <LogoContainer/>
            
            
            </div>

    }</>);
}

export default UserRegister;