import React, {createContext,useState} from 'react'
import api from '../services/api';

interface  AuthContextData{
    signed: boolean,
    user: User | null,
    authorization(email?:string, password?:string,UseToken?:Boolean): Promise<void>
}

interface User {
    
    id:Number,
    name:string,
    lastName:string,
    email:string
    
}



const AuthContext = createContext <AuthContextData> ({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] = useState<User|null>(null) 
    async function authorization(email?:string,password?:string, UseToken?:Boolean){
        
        if (UseToken){
            const token = localStorage.getItem("@Proffy/token")
            if (token){
                const response = await api.post("auth",{},{headers:{
                    'authorization': `Baerer ${token}`
                }})
                console.log(token)
                setUser(response.data.user);
                
            }
            return ;
        }
        const response = await api.post("auth",{
            email,
            password
        })

        
        setUser(response.data.user)

        if (response.data === null){            
            alert("Erro no login")
        }else{
            localStorage.setItem("@Proffy/token",response.data.token)

            alert("Sucesso no login")
            console.log(localStorage.getItem("@Proffy/token"))

    
        }
    
    }
    return(
        <AuthContext.Provider value= {{signed: !!user, user,authorization }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;