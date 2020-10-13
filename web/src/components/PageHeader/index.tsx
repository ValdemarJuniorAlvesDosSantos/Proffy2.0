import React from 'react'
import { Link } from "react-router-dom";
import './styles.css'

import logoIcon from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

interface PageHeaderProps{
    title:string;
    description?:string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

    return(
        <header className="page-header">
                <div className="top">
                    <div className="top-bar-container">
                        <Link to="/"> 
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                        <strong>{props.title}</strong>
                        <img src={logoIcon} alt="Proffy"/>
                    </div>

                </div>
                

                <div className="header-content">
                    {props.description && <p> {props.description}</p>}

                    {props.children}
                </div>
                
        </header>

    );
}

export default PageHeader;