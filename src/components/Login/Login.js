import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login({ setAdmin, setUser,setUserName }) {

    const [loginInfo, setLoginInfo] = React.useState({})
    const form = React.useRef(null)
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginInfo = { ...loginInfo };
        newLoginInfo[field] = value;
        setLoginInfo(newLoginInfo)

    }
    const handleLogin = (e) => {
        // console.log(product)
        // send data to the server
        if (loginInfo.userName === 'test-admin' && loginInfo.password === 'test-admin') {
            setAdmin(true)
            setUser(true)
            setUserName('test-admin')
            history.push('/dashboard')
        } else if (loginInfo.userName === 'test-sales' && loginInfo.password === 'test-sales') {
            setAdmin(false)
            setUser(true)
            setUserName('test-sales')
            history.push('/dashboard')

        } else {
            alert('incorrect user or password')
            setAdmin(false)
            setUser(false)
            setUserName('')

        }


        e.preventDefault()
    }


    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#fff8f8', width: '600px', marginTop: '200px', padding: '30px', borderRadius: '40px' }}>
            <h1 style={{ color: 'red' }}>Login</h1>



            <form
                ref={form}
                onSubmit={handleLogin}>

                <TextField
                    required
                    sx={{ width: '90%', m: 2 }}
                    label="Username"
                    variant="standard"
                    name='userName'
                    onBlur={handleOnBlur} />

                <TextField
                    required
                    sx={{ width: '90%', m: 2 }}
                    label="Password"
                    variant="standard"
                    name='password'
                    type='password'
                    onBlur={handleOnBlur} />



                <button

                    style={{ marginTop: 20, width: '90%', backgroundColor: '#FEEAEB', color: 'red', padding: '10px', borderRadius: '15px', cursor: 'pointer', fontSize: '20px' }} type='submit'>LOGIN</button>

            </form>


        </div>
    </div>;
}
