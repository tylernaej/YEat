import React from "react";
import './ContactInfo.css'


function ContactInfo({ business }){
    
    return (
        <div id='contact-info-container'>
            <div className="flex-row" id='website-container'>
                <div>
                    {business.website}
                </div>
                <div>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
            </div>           
            <div className="flex-row" id='phone-container'>
                <div>
                    {business.phone}
                </div>
                <div>
                    <i className="fa-solid fa-phone-flip"></i>
                </div>               
            </div>
            <div>
                potential map info?
            </div>          
        </div>
    )
}

export default ContactInfo