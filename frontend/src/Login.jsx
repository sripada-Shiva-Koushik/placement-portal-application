import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/');
                } else {
                    setError(res.data.Error)
                }
            }
                // console.log(res)
            )
            .catch(err => console.log(err));
    }

    return (
        <div className='login-box'>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div className='user-box'>
                    <input
                        type='email'
                        name='email'
                        required
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    <label>Email</label>
                </div>
                <div className='user-box'>
                    <input
                        type='password'
                        name='password'
                        required
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                    <label>Password</label>
                </div>
                <button type='submit'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Log in
                </button>
            </form>
            <div className='text-danger'>
                {error && error}
            </div>
        </div>
    )
}

export default Login