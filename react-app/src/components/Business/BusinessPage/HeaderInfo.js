import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './headerInfo.css'

// helper functions

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

    if (reviews?.length === 0) {
        return 'No reviews yet'
    }
    else if (reviews?.length === 1) {
        return `${reviews?.length} review`;
    }
    else {
        return `${reviews?.length} reviews`;
    }
}


// component

function HeaderInfo({ business, reviewsList, bizCategories }) {

    const categoriesList = []
    business.categories.map(category => {
        categoriesList.push(category)
    })

    const price = dollarsigns(business.priceRange)
    const photoCount = photoInHeader(business)
    const reviewsCount = reviewInHeader(reviewsList)

    const numratings1 = reviewsList.filter(review => review.rating === 1).length
    const numratings2 = reviewsList.filter(review => review.rating === 2).length
    const numratings3 = reviewsList.filter(review => review.rating === 3).length
    const numratings4 = reviewsList.filter(review => review.rating === 4).length
    const numratings5 = reviewsList.filter(review => review.rating === 5).length

    const avg = ((numratings1 * 1) + (numratings2 * 2) + (numratings3 * 3) + (numratings4 * 4) + (numratings5 * 5)) / reviewsList.length
    const ratingPercentage = ((avg / 5) * 100).toFixed(2)

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
                        <div class="stars-outer">
                        <div class="stars-inner" style={{width: `${ratingPercentage}%`}}></div>
                        </div>
                        </div>
                        <div id='right-side'>
                            {reviewsCount}
                        </div>
                    </div>
                    <div id='row'>
                        <div id='business-priceRange' style={{color: 'rgba(4, 197, 133)'}}>
                            {price}
                        </div>
                        <div id='right-side'>
                            {bizCategories.join(', ')}
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
