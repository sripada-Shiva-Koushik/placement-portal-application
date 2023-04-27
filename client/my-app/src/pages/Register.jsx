import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = async (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            navigate("/add");
        } catch (err) {
            setError(err.response.data);
        }
    };
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form className='form-container'>
                <div className='form-group'>
                    <label htmlFor="register">Register Number</label>
                    <input required type="number" placeholder='register' name='register' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input required type="text" placeholder='username' name='username' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input required type="email" placeholder='email' name='email' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input required type="password" placeholder='password' name='password' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="gender">Gender</label>
                    <input required type="text" placeholder='gender' name='gender' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="year">Year of Passing</label>
                    <input required type="number" placeholder='year' name='year' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <button onClick={handleSubmit} className='form-submit'>Register</button>
                    {err && <p>{err}</p>}
                </div>
                <span>
                    Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register