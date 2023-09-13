import React, { useEffect } from 'react';
import sahil from '../images/Prof1.jpg';
import linkin from '../images/linkin.jpg';
import  utube from '../images/utube.jpg';
import tele from '../images/tele.jpg';
import insta from '../images/insta.jpg';
import leet from '../images/leet.jpg';
import codnin from '../images/codnin.jpg';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import noprof from '../images/noprof.png';

const About = () => {

    const navigate=useNavigate();
    const [userData, setUserData]=useState({});

    const callAboutPage=async()=>{
        try {
            const res=await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data=await res.json();
            console.log(data);
            setUserData(data);
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }

        } catch(err){
            console.log(err);
            navigate('/signin', {replace:'true'})
        }
    }
    useEffect(()=>{
         callAboutPage();               //cannot use async await inside useffect
    },[]);

    return (
        <>
            <div className='container emp-profile'>
                <form method='GET'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='profile-img'>
                                <img src={userData.name==='Sahil' ? sahil : noprof} className='profile1-img' alt='Sahil' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5>{userData?.name}</h5>
                                <h6>{userData?.work}</h6>
                                <p className='profile-rating mt-3 mb-5'>Rankings: <span>1/10</span></p>


                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link-active mt-10" id='home-tab' data-toggle='tab' href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link-active" id='profile-tab' data-toggle='tab' href="#profile" role="tab">Timeline</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <input type='submit' className='profile-edit-button' name="btn-add-more" value="Edit Profile" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='Profile-work'>
                                <p><b>WORK LINK </b></p>
                                <a href="https://web.telegram.org/a/" target="_Sahil"><img src={tele} alt="telegram" className="tele"/>Telegram</a><br />
                                <a href="https://www.youtube.com/@SahilRoy-nz5cw/featured" target="_Sahil"><img src={utube} alt="Youtube" className="utube"/> YouTube</a><br />
                                <a href="https://www.instagram.com/sahilroy1860/" target="_Sahil"><img src={insta} alt="Instagram" className="insta"/> Instagram</a><br />
                                <a href="www.linkedin.com/in/
sahil-roy-518914250
/" target="_Sahil"><img src={linkin} alt='linked in' className='linkin'/> Linked In</a><br />
                                <a href="https://leetcode.com/Sahil_Roy/" target="_Sahil"><img src={leet} alt="leetcode" className="leet"/> Leet Code</a><br />
                                <a href="https://www.codingninjas.com/studio/profile/20e07df4-17df-4e03-a9aa-eb5c8d13c17d" target="_Sahil"><img src={codnin} alt="coding ninjas" className="codnin"/> Code studios</a><br />
                            </div>
                        </div>
                        <div className="col-md-6 about-info">
                            <div className='tab-content profile-tab' id='myTabContent'>
                                <div className='tab-pane fade shadow active' id='home' role='tabpanel' area aria-labelledby='home-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>User Id</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData?._id}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData?.name}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData?.email}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData?.phone}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Occupation</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{userData?.work}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='tab-pane fade shadow active' id='profile' role='tabpanel' area aria-labelledby='profile-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Experience</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Hourly Earn</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Rs.10/hr</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Total Projects</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>10</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>English Level</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Moderate</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Availability</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>3 Months</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default About