import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './headerInfo.css'

import defaultImage1 from "../../../assets/defaultBusinessImages/business_default1.jpg"
import defaultImage2 from "../../../assets/defaultBusinessImages/business_default2.jpg"
import defaultImage3 from "../../../assets/defaultBusinessImages/business_default3.jpg"
import defaultImage4 from "../../../assets/defaultBusinessImages/business_default4.jpg"
import defaultImage5 from "../../../assets/defaultBusinessImages/business_default5.jpg"
import defaultImage6 from "../../../assets/defaultBusinessImages/business_default6.jpg"
import defaultImage7 from "../../../assets/defaultBusinessImages/business_default7.jpg"
import defaultImage8 from "../../../assets/defaultBusinessImages/business_default8.jpg"
import defaultImage9 from "../../../assets/defaultBusinessImages/business_default9.jpg"
import defaultImage10 from "../../../assets/defaultBusinessImages/business_default10.jpg"

const defaultImages = [defaultImage1, defaultImage2, defaultImage3, defaultImage4, defaultImage5,
    defaultImage6, defaultImage7, defaultImage8, defaultImage9, defaultImage10]

// helper functions

function dollarsigns(range) {
    let signs = ''
    for (let i = 0; i < Number(range); i++) {
        signs = signs.concat('$')
    }
    return signs
}

function photoInHeader(business) {
    if (business.images?.length === 0) {
        return 'No photos available'
    }
    else if (business.images?.length === 1) {
        return `See ${business.images?.length} photo`;
    }
    else {
        return `See ${business.images?.length} photos`;
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

    const bizDefaultImg = defaultImages[business.id % defaultImages.length]

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

    const avg = reviewsList.length ? ((numratings1 * 1) + (numratings2 * 2) + (numratings3 * 3) + (numratings4 * 4) + (numratings5 * 5)) / reviewsList.length : 0
    const ratingPercentage = ((avg / 5) * 100).toFixed(2)

    return (
        <>
            <div id='business-images-container'>
                {/* {photoInHeader()} */}
                {/* See {photoCount} photos */}
                <div id='business-images-carousel'>
                    {/* map the images onto here */}
                    <div className="business-image-container">

                        {/* {business.images?.length ?
                            business.images.map(image =>
                                <img
                                    className="actual-image"
                                    src={`${image.url}`} />
                            )
                            :
                            <img
                                className="actual-image"
                                src={`${bizDefaultImg}`} />
                        } */}

                        <img
                            className="actual-image"
                            src={`${bizDefaultImg}`} />

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
                                <div class="stars-inner" style={{ width: `${ratingPercentage}%` }}></div>
                            </div>
                        </div>
                        <div id='right-side'>
                            {reviewsCount}
                        </div>
                    </div>
                    <div id='row'>
                        <div id='business-priceRange' style={{ color: 'rgba(4, 197, 133)' }}>
                            {price}
                        </div>
                        <div id='right-side'>
                            {bizCategories.join(', ')}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default HeaderInfo
