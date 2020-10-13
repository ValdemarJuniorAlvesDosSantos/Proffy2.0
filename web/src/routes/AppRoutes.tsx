import React from 'react'

import {BrowserRouter, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'
import Profile from '../pages/Profile'

function AppRoutes (){
    
    return (
        <BrowserRouter>            
            <Route path="/" exact component={Landing} />               
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} /> 
            <Route path="/login" component={Landing} />
            <Route path="/register" component={Landing} />            
            <Route path="/profile" component={Profile} />
         </BrowserRouter>
    )
    
  
}

export default AppRoutes;