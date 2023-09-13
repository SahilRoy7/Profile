import React, {useState} from 'react'
import signpic from "../images/signup.jpg";
import {  NavLink,useNavigate} from 'react-router-dom';


const Signup=()=>{
    const navigate=useNavigate();
    const [user, setUser]=useState({
        name:"", email:"", phone:"", work:"", password:"", cnfrmpassword: "" 
    });

    let name, value;

    const handleInputs=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user, [name]:value});      //name in square bracket denote dynamic data, here we used spread operator
    }

    const PostData=async(e)=>{
        e.preventDefault();

        const {name, email, phone, work, password, cnfrmpassword}=user;
        const res=await fetch("/signup", {
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cnfrmpassword    
            })
        });
        const data=await res.json();
        if(res.status === 422 || !data){
            window.alert('Invalid Registration');
            console.log('invalid Registration');
        }
        else{
            window.alert('Registration successful');
            console.log('Successful Registration');

            navigate('/signin', {replace:true});
        }
    }

    return(
        <>
            <section className='signup1'>
                <div className='container mt-5'>
                    <div className='signup-content'>
                        <div className='signup-form'>
                            <h2 className='form-title1'>Sign up</h2>
                            <form method= "POST" className='register-form' id='register-form'>
                                <div className='form-group form-field1'>
                                    <label htmlFor='name'>
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name'/>
                                </div>
                                <div className='form-group form-field1'>
                                    <label htmlFor='email'>
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type='email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Email'/>
                                </div>
                                <div className='form-group form-field1'>
                                    <label htmlFor='phone'>
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type='text' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Phone no.'/>
                                </div>
                                <div className='form-group form-field1'>
                                    <label htmlFor='work'>
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type='text' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Occupation'/>
                                </div>
                                <div className='form-group form-field1'>
                                    <label htmlFor='password'>
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type='password' name='password' id='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Password'/>
                                </div>
                                <div className='form-group form-field1'>
                                    <label htmlFor='cnfrmpassword'>
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type='password' name='cnfrmpassword' id='cnfrmpassword' autoComplete='off' value={user.cnfrmpassword} onChange={handleInputs} placeholder='Confirm Password'/>
                                </div>
                                <div className='form-group form-button1'>
                                    <input type='submit' name='signup' id='signup' className='form-submit1' value='Register'  onClick={PostData}/>
                                </div>
                            </form>
                            </div>
                            <div className='signup-image'>
                                <figure>
                                    <img src={signpic} alt='registration pic' className='sign-up'/>
                                </figure>
                                <NavLink to="/signin" className="signup-image-link1">Already Registered</NavLink>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Signup