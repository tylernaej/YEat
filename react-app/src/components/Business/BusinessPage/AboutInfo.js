import React from "react";

function AboutInfo({ business }){

    let emptyString = ''
    business.categories.forEach(category => {
        emptyString += `${category}, `
    })
    const specialties = emptyString.slice(0, emptyString.length -2)

    console.log('specialties', specialties)
    return (
        <div className="border-top-black-2px">
            <div>
                <h2 id="from-the-business">
                    From the business
                </h2>
                <div>
                    <div id='specialties-container'>
                        Specialties:
                        <div id='specialties'>
                            {specialties}
                        </div>
                    </div>
                    <div id='about-container'>
                        About {business.name}:
                        <div id='business-description'>
                            {business.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutInfo
