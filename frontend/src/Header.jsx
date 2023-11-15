import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <Link to="/" className="logo">
                                    <img src="assets/images/logo1.jpg" alt="" style={{ width: '100%' }} />
                                </Link>
                                <ul className="nav">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li><Link to="/home" className="active">Dashboard</Link></li>
                                    <li><Link to="/internship" className="active">Internship</Link></li>
                                    <li><Link to="/placement" className="active">Placement</Link></li>
                                    <li><Link to="/login">Sign out</Link></li>
                                </ul>
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header