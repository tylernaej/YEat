import React from "react";


function ContactInfo({ business }){
    
    console.log(business)

    return (
        <div>
            <div>
                {business.website}
            </div>           
            <div>
                {business.phone}
            </div>
            <div>
                potential map info?
            </div>          
        </div>
    )
}

export default ContactInfo