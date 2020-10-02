import React,{ useContext } from 'react'
import './styles.css'


import AuthContext from '../../contexts/auth';
import { PowerSettingsNew } from '@material-ui/icons';



const PageHeaderUser:React.FC = (props)=> {
    function handleLogout(){
        
        logout()
    }
    const {user,logout} = useContext(AuthContext)
    return(
        <div className="page-header-user">   
            <div className="user-info">
                <img src={user?.avatar} alt="Proffy" className="avatar"/>
                <p>{`${user?.name} ${user?.lastName}`}</p>
            </div>     
            {props.children}       
            <button className="buttonLogout" type="button" onClick={handleLogout}>                    
                <PowerSettingsNew fontSize="inherit"> </PowerSettingsNew>                    
            </button>
        </div>

    );
}

export default PageHeaderUser;