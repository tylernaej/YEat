import React from "react";
import { NavLink } from "react-router-dom";
import './headerInfo.css'

function dollarsigns(range) {
    let signs = ''
    for (let i = 0; i < Number(range); i++) {
       signs = signs.concat('$')
    }
    return signs
}

function HeaderInfo({ business }) {
    // console.log(Object.values(business.categories)[1])
    const categoriesList = []
    business.categories.map(category => {
        categoriesList.push(category)
    })
    // console.log(categoriesList)

    const price = dollarsigns(business.priceRange)
    console.log(business.priceRange)
    console.log(price)

    function photoInHeader() {
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

    function reviewInHeader() {
        if (business.reviews.length === 0) {
            return 'No reviews available'
        }
        else if (business.reviews.length === 1) {
            return `${business.reviews.length} review`;
        }
        else {
            return `${business.reviews.length} reviews`;
        }
    }

    return (
        <>
            <div id='business-images-container'>
                {photoInHeader()}
                {/* See {business.images.length} photos */}
                <div id='business-images-carousel'>
                    {/* map the images onto here */}
                    <div className="business-image-container">
                        <img className="actual-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1920px-Restaurant_N%C3%A4sinneula.jpg" />
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
                            {business.avgReviews.toFixed(2)}
                        </div>
                        <div id='right-side'>
                            {reviewInHeader()}
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
