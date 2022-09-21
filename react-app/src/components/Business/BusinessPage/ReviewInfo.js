import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBizReviewThunk } from "../../../store/reviews";
import './ReviewInfo.css'

function ReviewInfo({ business, reviewsList, usersReview }) {

    // filter the reviews by rating
    const numratings1 = reviewsList.filter(review => review.rating === 1).length
    const numratings2 = reviewsList.filter(review => review.rating === 2).length
    const numratings3 = reviewsList.filter(review => review.rating === 3).length
    const numratings4 = reviewsList.filter(review => review.rating === 4).length
    const numratings5 = reviewsList.filter(review => review.rating === 5).length
    // max num rating identified by which rating has most
    const maxNumRatings = Math.max(numratings1, numratings2, numratings3, numratings4, numratings5, 1)
    const avg = ((numratings1 * 1) + (numratings2 * 2) + (numratings3 * 3) + (numratings4 * 4) + (numratings5 * 5)) / reviewsList.length
    const ratingPercentage = ((avg / 5) * 100).toFixed(2)

    // calculations for the dynamic bars
    const filled1 = ((numratings1 / maxNumRatings) * 100 === Infinity) ? 0 : (numratings1 / maxNumRatings) * 100
    const filled2 = ((numratings2 / maxNumRatings) * 100 === Infinity) ? 0 : (numratings2 / maxNumRatings) * 100
    const filled3 = ((numratings3 / maxNumRatings) * 100 === Infinity) ? 0 : (numratings3 / maxNumRatings) * 100
    const filled4 = ((numratings4 / maxNumRatings) * 100 === Infinity) ? 0 : (numratings4 / maxNumRatings) * 100
    const filled5 = ((numratings5 / maxNumRatings) * 100 === Infinity) ? 0 : (numratings5 / maxNumRatings) * 100

    // calculations for the empty divs adjacent to each percentage
    // const void1 = 100 - filled1
    // const void2 = 100 - filled2
    // const void3 = 100 - filled3
    // const void4 = 100 - filled4
    // const void5 = 100 - filled5

    console.log(usersReview)

    return (
        <div className="border-top-black-2px">
            <h2>Reviews</h2>
            <div className="w100 flex-row-align-center">
                <div className="w30">
                    <div>
                        <h4>Overall rating</h4>

                        <div class="stars-outer">
                            <div class="stars-inner" style={{width: `${ratingPercentage}%`}}></div>
                        </div>

                        <p className="textcolor-grey">{reviewsList.length} reviews</p>
                        <div>
                            <i className="fa-regular fa-star"></i>
                            {!usersReview &&
                                <NavLink to={`/businesses/${business.id}/create-review`}>Write a review</NavLink>
                            }
                            {usersReview &&
                                <NavLink to={`/businesses/${business.id}/edit-review`}>Edit your review</NavLink>

                            }
                            {/* { visibility: `${sessionUser && sessionUser.id === business.ownerId ? "visible" : "hidden"}` } */}
                        </div>
                    </div>
                </div>
                <div className="w70 flex-column">

                    <div className="flex-row-align-center">
                        <div className="w30"><span>5 stars</span></div>
                        <div className="reviewMeter">
                            <div id='five-star-filled-bar' className="reviewMeterBar" style={{ width: `${filled5}%`, backgroundColor: "rgb(251,80,60)" }}>
                            </div>
                            {/* <div id='five-star-void-bar'style={{width:`${void5}%`, backgroundColor:"grey"}}>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-row-align-center">
                        <div className="w30"><span>4 stars</span></div>
                        <div className="reviewMeter">
                            <div id='four-star-filled-bar' className="reviewMeterBar" style={{ width: `${filled4}%`, backgroundColor: "rgb(255,100,61)", }}>
                            </div>
                            {/* <div id='four-star-void-bar' style={{width:`${void4}%`, backgroundColor:"grey"}}>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-row-align-center">
                        <div className="w30"><span>3 stars</span></div>
                        <div className="reviewMeter">
                            <div id='three-star-filled-bar' className="reviewMeterBar" style={{ width: `${filled3}%`, backgroundColor: "rgb(255,135,66)" }}>
                            </div>
                            {/* <div id='three-star-void-bar'style={{width:`${void3}%`, backgroundColor:"grey"}}>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-row-align-center">
                        <div className="w30"><span>2 stars</span></div>
                        <div className="reviewMeter">
                            <div id='two-star-filled-bar' className="reviewMeterBar" style={{ width: `${filled2}%`, backgroundColor: "rgb(255,173,72)" }}>
                            </div>
                            {/* <div id='two-star-void-bar'style={{width:`${void2}%`, backgroundColor:"grey"}}>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-row-align-center">
                        <div className="w30"><span>1 stars</span></div>
                        <div className="reviewMeter">
                            <div id='one-star-filled-bar' className="reviewMeterBar" style={{ width: `${filled1}%`, backgroundColor: "rgb(255,204,75)" }}>
                            </div>
                            {/* <div id='one-star-void-bar'style={{width:`${void1}%`, backgroundColor:"grey"}}>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ReviewInfo
