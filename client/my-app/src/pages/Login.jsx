// import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
// import React from 'react';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBInput,
//     MDBIcon
// } from 'mdb-react-ui-kit';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const { login } = useContext(AuthContext);

    const handleChange = async (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/home");
        } catch (err) {
            setError(err.response.data);
        }
    };
    return (
        <div className='auth'>
            {/* // <div> */}
            <h1>Login</h1>
            <form className='login-form'>
                <label htmlFor="username" >Username</label>
                <input type="text" required placeholder='username' size="lg" name='username' onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" required placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>
                    Don't you have an account? <Link to="/register">Register</Link>
                </span>
            </form>



            {/* <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" />

                                {/* <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
                                    Login
                                </MDBBtn> */}
            {/* <button onClick={handleSubmit} className='mx-2 px-5' size='lg'>Login</button>
            {err && <p>{err}</p>}

        </MDBCardBody>
                        </MDBCard >

                    </MDBCol >
                </MDBRow >

            </MDBContainer > * /} */}

        </div >


    )
}

export default Login