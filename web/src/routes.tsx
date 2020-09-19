import React ,{useContext,useEffect} from 'react'

import AuthContext from './contexts/auth'
import AppRoutes from './routes/AppRoutes'
import AuthRoutes from './routes/AuthRoutes'



function Routes (){
    
    const { signed,authorization } = useContext(AuthContext)

    useEffect(()=>{        
        authorization('','',true,false)        
    },[])
    
    return signed ? <AppRoutes/> : <AuthRoutes/>
    

}

export default Routes;