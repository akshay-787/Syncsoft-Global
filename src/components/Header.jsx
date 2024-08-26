import React from 'react'
import logo from '../assets/inox-logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
            <header className="d-flex justify-content-center align-items-center text-center">
                <Link to='/'>
                <img src={logo} />
                </Link>
            </header>
    )
}

export default Header