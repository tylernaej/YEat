import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './headerInfo.css'

function dollarsigns(range) {
    let signs = ''
    for (let i = 0; i < Number(range); i++) {
       signs = signs.concat('$')
    }
    return signs
}

function photoInHeader(business) {
    if (business.images.length === 0) {
        return 'No photos available'
    }
    else if (business.images.length === 1) {
        return `See ${business.images.length} photo`;
    }
    else {
        return `See ${business.images.length} photos`;
    }
}

function reviewInHeader(reviews) {
    // console.log(business)
    if (reviews?.length === 0) {
        return 'No reviews available'
    }
    else if (reviews?.length === 1) {
        return `${reviews?.length} review`;
    }
    else {
        return `${reviews?.length} reviews`;
    }
}

function HeaderInfo({ business }) {
    // console.log(Object.values(business.categories)[1])
    const categoriesList = []
    business.categories.map(category => {
        categoriesList.push(category)
    })
    // console.log(categoriesList)
    console.log('OVER', business)

    const price = dollarsigns(business.priceRange)
    const photoCount = photoInHeader(business)
    const reviewsCount = reviewInHeader(business?.reviews)




    return (
        <>
            <div id='business-images-container'>
                {/* {photoInHeader()} */}
                {/* See {photoCount} photos */}
                <div id='business-images-carousel'>
                    {/* map the images onto here */}
                    <div className="business-image-container">
                        <img className="actual-image" src="https://www.atlantaluxuryrentals.com/wp-content/uploads/2021/08/Local-Restaurants-Atlanta.jpg" />
                    </div>
                </div>
            </div>
            <div id='header-component'>
                <div>
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
                            {reviewsCount}
                        </div>
                    </div>
                    <div id='row'>
                        <div id='business-priceRange'>
                            {price}
                        </div>
                        <div id='right-side'>
                            {categoriesList.join(', ')}
                        </div>
                        {/* <div id='right-side'>
                    <NavLink to={`/businesses/${business.id}/edit`}>Edit</NavLink>
                </div> */}
                    </div>
                </div>

            </div>

        </>
    )
}

export default HeaderInfo
