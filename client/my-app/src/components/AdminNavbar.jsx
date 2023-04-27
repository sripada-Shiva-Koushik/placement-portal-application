import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png"

const AdminNavbar = () => {
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
                    <Link className='link' to="/adminHome">
                        <h6>Home</h6>
                    </Link>
                    <Link className='link' to="/adminPlacement">
                        <h6>Placement</h6>
                    </Link>
                    <Link className='link' to="/adminInternship">
                        <h6>Internship</h6>
                    </Link>
                    <Link className='link' to="/">
                        <span>{currentUser?.username}</span>
                        {currentUser ? (
                            <span onClick={logout}>Logout</span>

                        ) : (
                            <Link className="link" to="/">
                                Login
                            </Link>
                        )}
                    </Link>

                    {/* <span className='write'>
                        <Link to="/write">Write</Link>
                    </span> */}
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar