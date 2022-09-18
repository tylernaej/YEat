import React from "react";
import './headerInfo.css'

function HeaderInfo({ business }){
        // console.log(business)
        
    return (
        <div id='header-component'>
            <div id='row-1'>
                <h1 id='business-name'>
                    {business.name}
                </h1>
            </div>
            <div id='row'>
                <div id='business-avgReview'>
                    {business.avgReviews}
                </div>
                <div id='right-side'>
                    {business.numReviews} reviews
                </div>
            </div>
            <div id='row'>
                <div id='business-priceRange'>
                    {business.priceRange}
                </div>
                <div id='right-side'>
                    {business.categories}
                </div>
                <div id='right-side'>
                    Edit
                    {/* redirect to the edit page? */}
                </div>
            </div>
            <div id='row'>
                <div id='business-images'>
                    {business.images.length > 1 ? `See ${business.images.length} photos` : `See ${business.images.length} photo`}
                    {/* See {business.images.length} photos */}
                </div>
            </div>
        </div>
    )
}

export default HeaderInfo
