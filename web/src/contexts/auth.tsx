import React, {createContext,useState} from 'react'
import api from '../services/api';

interface  AuthContextData{
    signed: boolean,
    user: User | null,
    authorization(email:string, password:string): Promise<void>
}

interface User {
    user : {
        id:Number,
        name:string,
        lastName:string,
        email:string,
        password:string
    },
    token:string
}



const AuthContext = createContext <AuthContextData> ({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] = useState<User|null>(null) 
    async function authorization(email:string,password:string){
        const response = await api.post("auth",{
            email,
            password
        })

        
        setUser(response.data)

        if (response.data === null){            
            alert("Erro no login")
        }else{
            alert("Sucesso no login")
    
        }
    
    }
    return(
        <AuthContext.Provider value= {{signed: !!user, user,authorization }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;