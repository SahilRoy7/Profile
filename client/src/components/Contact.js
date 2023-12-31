import React, {useEffect, useState} from 'react'
import phone from '../images/phone.jpg';
import mail from '../images/mail.png';
import address from '../images/address.png';


const Contact = () => {

    const [userData, setUserData]=useState({name:"", email:"", phone:"", message:""});

    

    const userContact=async()=>{
        try {
            const res=await fetch('/getData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data=await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }

        } catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
         userContact();               //cannot use async await inside useffect
    },[]);

    const handleInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUserData({...userData, [name]:value});
    }

    const contactForm=async(e)=>{
        e.preventDefault();
        const {name, email, phone, message} = userData;
        const res= await fetch('/contact', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();

        if(!data){
            console.log("Message not sent");
        }else{
            alert("Message Sent")
            setUserData({...userData, message: ""});
        }
    }

    return (
        <>
            <div className='contact_info'>
                <div className='contact-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-1 d-flex justify-contact-between'>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                <img src={phone} alt='phone' className='phone'/>
                                <div className='contact_info_contact'>
                                    <div className='contact_info_title'>
                                        <b>Phone</b>
                                    </div>
                                    <div className='contact_info_text'>
                                        +91 9838-948-9189
                                    </div>
                                </div>
                            </div>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                <img src={mail} alt='mail' className='mail'/>
                                <div className='contact_info_contact'>
                                    <div className='contact_info_title'>
                                    <b>Email</b>
                                    </div>
                                    <div className='contact_info_text'>
                                        sahil@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className='contact-info-item d-flex justify-content-start align-items-center'>
                                <img src={address} alt='address' className='address'/>
                                <div className='contact_info_contact'>
                                    <div className='contact_info_title'>
                                    <b>Address</b>
                                    </div>
                                    <div className='contact_info_text'>
                                        Panchgram, Hailakandi, Assam, 788802
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact-form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                                <div className='contact_form_title'>
                                    Get In Touch
                                </div>
                                <form method="POST" id='contact_form'>
                                    <div className='content_form_name d-flex justify-content-between align-items-center'>
                                        <input type='text' id='contact_form_name' className='contact_form_name input-field' value={userData?.name} name='name' onChange={handleInputs} placeholder='Your Name' required='true'/>
                                        <input type='email' id='contact_form_email' className='contact_form_email input-field' value={userData?.email} name='email' onChange={handleInputs} placeholder='Email' required='true'/>
                                        <input type='phone' id='contact_form_phone' className='contact_form_phone input-field' value={userData?.phone} name='phone' onChange={handleInputs} placeholder='Phone no.' required='true'/>
                                    </div>

                                    <div className='contact_form_text mt-5'>
                                        <textarea className='textfield contact_form_message' value={userData?.message}  name='message' onChange={handleInputs} placeholder='Message' cols="123" rows="10"></textarea>
                                    </div>

                                    <div className='contact_form_button'>
                                        <button type='submit' className='button contact_submit_button' onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact