import React from 'react'
import Searchbar from './Searchbar'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {
    const navigate = useNavigate()
    const {logout} = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        // log the user out
        logout()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Course Evaluator</a>
                <Searchbar />
                {user && (
                    <div className="loggedin--buttons">
                        <span>{user.username}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="authentication--buttons">
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                )}
            </div>
        </nav>
    )
}