import React, {InputHTMLAttributes} from 'react';

import './layout.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string;
    name:string;
}
const Input: React.FC<InputProps> = ({ label, name,...rest })=>{
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>                
            <input  type="text" key={name}  {...rest}/>                        
        </div>
    );
}
export default Input;