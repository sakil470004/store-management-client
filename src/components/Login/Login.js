import { TextField } from '@mui/material';
import './Login.css'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addToDb, getStoredCart } from '../fakedb/fakedb';

export default function Login({ setAdmin, setUser, setUserName }) {

    const [loginInfo, setLoginInfo] = React.useState({})
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        if (loginInfo.userName === 'test-admin' && loginInfo.password === 'test-admin') {
            setAdmin(true)
            setUser(true)
            setUserName('test-admin')
            addToDb('test-admin')
            history.push('/dashboard')
        } else if (loginInfo.userName === 'test-sales' && loginInfo.password === 'test-sales') {
            setAdmin(false)
            setUser(true)
            setUserName('test-sales')
            addToDb('test-sales')
            history.push('/dashboard')

        } else {
            alert('incorrect user or password')
            setAdmin(false)
            setUser(false)
            setUserName('')

        }
        setLoading(false)

        e.preventDefault()
    }
    useEffect(() => {
        setLoading(true)
        const userData = getStoredCart().user;
        if (userData === 'test-admin') {
            setUserName(userData)
            setAdmin(true)
            setUser(true)
            history.push('/dashboard')
        } else if (userData === 'test-sales') {
            setAdmin(false)
            setUser(true)
            setUserName(userData)
            history.push('/dashboard')
        }
        
        setLoading(false)
    }, [])

    return <div className='login--container'>
        {loading ? <h1  style={{color:'white'}}>Loading ...</h1> :
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: '#fff8f8', width: '600px', padding: '30px', borderRadius: '40px' }}>
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

                        {/* this for user friendly work */}

                    </div>

                </div>
                <div style={{ color: 'red', marginTop: '10px' }}> For User : UserName and password :test-sales<br />
                    For Admin : UserName and password :test-admin
                </div>
            </div>}
    </div>
}
