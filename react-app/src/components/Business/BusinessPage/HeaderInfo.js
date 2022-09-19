import React from "react";
import { NavLink } from "react-router-dom";
import './headerInfo.css'

function HeaderInfo({ business }){
        // console.log(Object.values(business.categories)[1])
        const categoriesList = []
        business.categories.map(category => {
            categoriesList.push(category)
        })
        // console.log(categoriesList)

        function photoInHeader(){
            if(business.images.length === 0){
                return 'No photos available'
            }
            else if (business.images.length === 1){
                return `See ${business.images.length} photo`;
            }
            else {
                return `See ${business.images.length} photos`;
            }
        }

        function reviewInHeader(){
            if(business.reviews.length === 0){
                return 'No reviews available'
            }
            else if (business.reviews.length === 1){
                return `${business.reviews.length} review`;
            }
            else {
                return `${business.reviews.length} reviews`;
            }
        }
        
    return (
        <div id='header-component'>
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
                    {business.priceRange} price range
                </div>
                <div id='right-side'>
                    {categoriesList.join(', ')}
                </div>
                <div id='right-side'>
                    <NavLink to={`/businesses/${business.id}/edit`}>Edit</NavLink>
                </div>
            </div>
            <div id='row'>
                <div id='business-images'>
                    {photoInHeader()}
                    {/* See {business.images.length} photos */}
                </div>
            </div>
        </div>
    )
}

export default HeaderInfo
