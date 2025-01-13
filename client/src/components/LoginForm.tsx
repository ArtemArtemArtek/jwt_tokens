import React, {FC, useContext, useState} from 'react';

const LoginForm:FC=()=>{
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    
    return(
    <div>
        <input type='text' placeholder='Логин' value={login} onChange={e=>setLogin(e.target.value)} />
        <input type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
        <button>Войти</button>
    </div>
    )
}

export default LoginForm