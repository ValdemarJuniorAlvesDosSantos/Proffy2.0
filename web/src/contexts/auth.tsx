import React, {createContext,useState} from 'react'
import api from '../services/api';

interface  AuthContextData{
    signed: boolean,
    user: User | null,
    authorization(email?:string, password?:string,UseToken?:Boolean,save?:Boolean): Promise<void>,
    logout:Function
}

interface User {
    
    id:Number,
    name:string,
    lastName:string,
    email:string,
    avatar:string,
    bio:string,
    whatsapp:string
    
}



const AuthContext = createContext <AuthContextData> ({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] = useState<User|null>(null) 

    function logout (){

        localStorage.removeItem("@Proffy/token")
        setUser(null);

    }
    async function authorization(email?:string,password?:string, UseToken?:Boolean,save?:Boolean){
        
        if (UseToken){
            const token = localStorage.getItem("@Proffy/token")
            if (token){
                const response = await api.post("auth",{},{headers:{
                    'authorization': `Baerer ${token}`
                }})
                console.log(response.data)
                if (response.data !== null){
                    
                    setUser(response.data.user);

                }
                
            }
            return ;
        }
        const response = await api.post("auth",{
            email,
            password
        })

        
        

        if (response.data === null){            
            alert("Erro no login")
            setUser(null)
        }else{
            setUser(response.data.user)
            if (save){                
                localStorage.setItem("@Proffy/token",response.data.token)
            }

            alert("Sucesso no login")

    
        }
    
    }
    return(
        <AuthContext.Provider value= {{signed: !!user, user,authorization,logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;