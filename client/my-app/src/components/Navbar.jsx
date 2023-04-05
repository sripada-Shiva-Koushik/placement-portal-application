import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png"
// import Placement from '../pages/Placement'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to="/">
                        <h6>Home</h6>
                    </Link>
                    <Link className='link' to="/placement">
                        <h6>Placement</h6>
                    </Link>
                    <Link className='link' to="/internship">
                        <h6>Internship</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                    <span className='write'>
                        <Link to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar