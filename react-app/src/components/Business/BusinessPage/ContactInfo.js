import React from "react";


function ContactInfo({ business }){
    
    return (
        <div>
            <div>
                {business.website}
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>           
            <div>
                {business.phone}
                <i class="fa-solid fa-phone-flip"></i>
            </div>
            <div>
                potential map info?
            </div>          
        </div>
    )
}

export default ContactInfo