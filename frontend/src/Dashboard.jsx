import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Logo from "/Images/logo.png"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/dashboard')
            .then(res => {
                if (res.data.Status === "Success") {

                } else {
                    navigate('/login')
                }
            })
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/logout')
            .then(res => {
                navigate('/login')
            }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">
                                    <img src={Logo} alt="" />
                                </span>
                            </Link>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                                <li>

                                    <Link to='/' data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>

                                </li>
                                <li>
                                    <Link to="/placement" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Placement</span> </Link>

                                </li>


                                <li>
                                    <Link to='/internship' className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Internship</span> </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <Link to='#' className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="col p-0 m-0">
                        <div className='p-1 d-flex justify-content-center shadow'>
                            <h4>Placement Management System</h4>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard