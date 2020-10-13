import React, {InputHTMLAttributes} from 'react';

import './styles.css';

interface InputFloatLabel extends InputHTMLAttributes<HTMLInputElement>{
    label:string;
    name:string;
}
const InputFloatLabel: React.FC<InputFloatLabel> = ({ label, name,...rest })=>{
    return (
        <div className="inputFloatLabel-block">             
            <input placeholder=" " type="text" id={name} {...rest}/>            
            <label htmlFor={name}>{label}</label>                          
        </div>
    );
}
export default InputFloatLabel;