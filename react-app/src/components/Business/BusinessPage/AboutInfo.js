import React from "react";
import './AboutInfo.css'

function AboutInfo({ business, bizCategories }) {

    let emptyString = ''
    bizCategories.forEach(category => {
        emptyString += `${category}, `
    })
    const specialties = emptyString.slice(0, emptyString.length - 2)

    return (
        <div className="border-top-black-2px">
            <div>
                <h2 id="from-the-business">
                    From the business
                </h2>
                <div>
                    <div id='specialties-container'>
                        <h4>
                            Specialties:
                        </h4>
                        <div id='specialties'>
                            {specialties}
                        </div>
                    </div>
                    <div id='about-container'>
                        <h4>
                            About {business.name}:
                        </h4>
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
