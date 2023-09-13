import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage=()=>{
    return(
        <>
            <div id="not found">
                <div className="not-found">
                    <div className="not-found-404">
                        <h1 className="pt-4">404</h1>
                    </div>
                    <h2 className="pt-7">We are Sorry Page not Found!</h2>
                    <p className="mb-5">
                        The Page you are Looking for might have been removed or is temporarily unavailable
                    </p>
                    <NavLink className='nav-link1' to="/">Back to Homepage</NavLink>
                </div>
            </div>
        </>
    )
};

export default Errorpage