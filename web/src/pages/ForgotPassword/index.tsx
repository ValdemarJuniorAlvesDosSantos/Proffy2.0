import React, { useState,FormEvent } from 'react';
import LogoContainer from '../../components/LogoContainer';
import InputFloatLabel from '../../components/InputFloatLabel';
import api from '../../services/api';
import './styles.css'
import { Link } from 'react-router-dom';
import CompletedPage from '../../components/CompletedPage';
import backIcon from '../../assets/images/icons/back.svg';

function ForgotPassword(){
    
    const [email, setEmail] = useState('')
    

   
    const [isFiled, setIsFiled] = useState(false)
    
    const [success,setSuccess]= useState(false)

    async function handleForgotPassword( e:FormEvent){
        e.preventDefault();
        
        api.post("forgot_password",{           
            email         

        }).then((resposta)=>{
            if (!resposta.data.error){                
                setSuccess(true)
            }else{
                alert(resposta.data.error)
                alert(email)
                setSuccess(false)
            }
        }).catch((error)=>{
            alert(error)
        })
        

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
                <CompletedPage title={"Redefinição enviada!"}
                    subtitle= {"Boa, agora é só checar o e-mail que foi enviado para você \n Redefinir sua senha e aproveitar os estudos"}
                    textButton= {"Voltar ao Login."}
                />           
            
            :
            <div className="page-forgot-password">                 
                
                <main>
                    
                    <div className="mainContent">
                        <header>
                            <Link to="/" className="backIcon"> 
                                <img src={backIcon} alt="Voltar"/>
                            </Link>
                        </header>
                        
                        <form onSubmit={handleForgotPassword}>
                            <h1>Eita, esqueceu sua senha? </h1>
                            <p>Não esquenta vamos dar um jeito nisso</p>
                            <div className="inputsContainer">
                                <InputFloatLabel label="Email" name="email"  
                                    value={email} 
                                    onChange={ (e) =>{ 
                                        setEmail(e.target.value);
                                        handleSetIsFiled([e.target.value])           
                                    }}
                                
                                />
                                

                            </div>
                            <button type="submit" className=
                                {   isFiled
                                    ? "buttonEntrar insideButtonFiled"
                                    : " buttonEntrar "
                                }
                            >
                                    Enviar
                            </button>
                        </form>
                    </div>
                    
                </main>
                <LogoContainer/>
            
            
            </div>

    }</>);
}

export default ForgotPassword;