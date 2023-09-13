import React, {useState, useEffect} from 'react'

const Home = () => {

    const [userName, setUserName]=useState("");

     const [show, setShow]= useState(false);    

    const userHome=async()=>{
        try {
            const res=await fetch('/getData', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data=await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
        
        } catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
         userHome();               //cannot use async await inside useffect
    },[]);


    return (
        <>
            <div className='home-page'>
                <div className='home-div'>
                    <p className='pt-5'>WELCOME</p>
                    <h1 className='pt-10'>{userName}</h1>
                    <h2 className='pt-6'>{show ? "Happy to see You back" : "We are the Mern Developer"}</h2>
                </div>
            </div>
        </>
    )
}
export default Home