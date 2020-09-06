import React ,{useContext} from 'react'

import AuthContext from './contexts/auth'
import AppRoutes from './routes/AppRoutes'
import AuthRoutes from './routes/AuthRoutes'

function Routes (){
    const { signed } = useContext(AuthContext)
    
    return signed ? <AppRoutes/> : <AuthRoutes/>
    

}

export default Routes;