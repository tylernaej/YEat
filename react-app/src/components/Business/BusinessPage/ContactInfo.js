import React from "react";
import { NavLink } from "react-router-dom";
import MapContainer from "../../Maps";
import './ContactInfo.css'


function ContactInfo({ business }) {

    const center = {
        lat: Number(business.latitude),
        lng: Number(business.longitude)
    }

    return (
        <div id='contact-info-container'>
            <div className="flex-row-justify-between padding20" id='website-container'>
                <div>
                    <a href={business.website} target="_blank" rel="noreferrer noopener">
                        {business.website}
                    </a>
                </div>
                <div>
                    <a href={business.website} target="_blank" rel="noreferrer noopener">
                        <i id="arrow-right" className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
            <div className="flex-row-justify-between padding20" id='phone-container'>
                <div>
                    {business.phone}
                </div>
                <div>
                    <i className="fa-solid fa-phone-flip"></i>
                </div>
            </div>
            <div id='google-maps-outer-container'>
                <div id='google-maps-inner-container'>
                    <MapContainer center={center} business={business}/>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
