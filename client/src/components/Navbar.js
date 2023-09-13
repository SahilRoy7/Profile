import React, {useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo1.jpg";
import {UserContext} from "../App"; 

const Navbar = () => {
    const location = useLocation();
    const {state,  dispatch}=useContext(UserContext);
    const RenderMenu=()=>{
        if(state){
            return(
                <>
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/logout' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/logout">LogOut</Link>
                        </li>
                </>
            )
        }else{
            return(
                <>
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/signin' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/signin">LogIn</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/signup">Register</Link>
                        </li>
                        
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">
                    <img className="img" src={logo} alt="logo" /><b className='com'> roy</b><b className='com1'>Tube</b>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <RenderMenu />
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar

