import React from 'react';
import {useState, useContext} from 'react';
import signinpic from '../images/login.png';
import {  NavLink, useNavigate } from 'react-router-dom';
import {UserContext} from "../App";


const Signin=()=>{
    const {state, dispatch}= useContext(UserContext);

    const navigate= useNavigate();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const loginUser=async(e)=>{
        e.preventDefault();                     //avoid bydefault reload functionaliy of forms 

        const res=await fetch('/signin',{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        });

        const data=await res.json();

        if(res.status===400 || !data){
            window.alert("Invalid Credentials");
        }else{
            dispatch({type:"USER", payload: true})
            window.alert("Login Successful");
            navigate('/', {replace:'true'});
        }

    }
    return(
        <>
            <section className='signin'>
                <div className='container mt-5'>
                    <div className='signin-content'>
                        <div className='signin-image'>

                                <figure>
                                    <img src={signinpic} alt='Login pic' className='signin'/>
                                </figure>

                                <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
                        </div>
                        <div className='signin-form'>

                            <h2 className='form-title'> Sign in</h2>

                            <form method='POST' className='register-form' id='register-form'>
                                
                                <div className='form-group form-field'>
                                    <label htmlFor='email'>
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type='email' name='email' id='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                                </div>
                                
                                <div className='form-group form-field'>
                                    <label htmlFor='password'>
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type='password' name='password' id='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                                </div>
                                
                                <div className='form-group form-button'>  
                                    <NavLink to="/about" className="signup-image-link1"><input type='submit' name='signin' id='signin' className='form-submit' value='Log In'
                                        onClick={loginUser}
                                    /></NavLink>
                                </div>
                            </form>
                        </div>                            
                    </div>
                </div>
            </section>
        </>
    )
}
export default Signin