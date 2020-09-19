import React  from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import LoginPage from '../pages/LoginPage'
import UserRegister from '../pages/UserRegister'
import CompletedPage from '../components/CompletedPage'

function AuthRoutes (){
        return(
            <BrowserRouter>                          
                <Route path="/" exact component={Landing} />
                <Route path="/teste" exact component={CompletedPage} />
                <Route path="/study" component={LoginPage} />
                <Route path="/give-classes" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={UserRegister} />            
            </BrowserRouter>
            
        )
  
}

export default AuthRoutes;