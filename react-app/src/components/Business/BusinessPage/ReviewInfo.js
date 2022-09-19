import React from "react";
import './ReviewInfo.css'

function ReviewInfo({ business }) {
    // maybe get reviews by using the useSelector to get reviews by business id and filter
    const numratings1 = business.reviews.filter(review => review.rating === 1).length
    const numratings2 = business.reviews.filter(review => review.rating === 2).length
    const numratings3 = business.reviews.filter(review => review.rating === 3).length
    const numratings4 = business.reviews.filter(review => review.rating === 4).length
    const numratings5 = business.reviews.filter(review => review.rating === 5).length
    const maxNumRatings = Math.max(numratings1, numratings2, numratings3, numratings4, numratings5, 1)

    // console.log(`rating1: ${numratings1}, rating2: ${numratings2}, rating3: ${numratings3}, rating4: ${numratings4}, rating5: ${numratings5}, maxrating: ${maxNumRatings}`)
    const filled1 = ((maxNumRatings / numratings1) * 100 === Infinity)? 0 : (maxNumRatings / numratings1) * 100
    const filled2 = ((maxNumRatings / numratings2) * 100 === Infinity)? 0 : (maxNumRatings / numratings2) * 100
    const filled3 = ((maxNumRatings / numratings3) * 100 === Infinity)? 0 : (maxNumRatings / numratings3) * 100
    const filled4 = ((maxNumRatings / numratings4) * 100 === Infinity)? 0 : (maxNumRatings / numratings4) * 100
    const filled5 = ((maxNumRatings / numratings5) * 100 === Infinity)? 0 : (maxNumRatings / numratings5) * 100
    // console.log(`filled1: ${filled1}, filled2: ${filled2}, filled3: ${filled3}, filled4: ${filled4}, filled5: ${filled5}`)
    const void1 = 100 - filled1 
    const void2 = 100 - filled2
    const void3 = 100 - filled3
    const void4 = 100 - filled4
    const void5 = 100 - filled5
    // console.log(`void1: ${void1}, void2: ${void2}, void3: ${void3}, void4: ${void4}, void5: ${void5}`)

    return (
        <div style={{width: "750px"}}>
            <h2>Reviews</h2>
            <div className="w100 flex-row">
                <div className="w30">
                    <div>
                        <p>Overall rating</p>
                        <p>{business.avgReviews}</p>
                        <p>{business.numReviews}</p>
                    </div>
                </div>
                <div className="w70 flex-column">
                    <div className="flex-row">
                        <div className="w30"><p>5 stars</p></div>
                        <div style={{width: '100%'}}>
                            <div id='five-star-filled-bar' style={{width:`${filled5}%`, backgroundColor:"yellowgreen", border:'red', height:'10px'}}>  
                            </div>
                            <div id='five-star-void-bar'style={{width:`${void5}%`, backgroundColor:"grey", border:'red'}}>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="w30"><p>4 stars</p></div>
                        <div style={{width: '100%'}}>
                            <div id='four-star-filled-bar' style={{width:`${filled4}%`, backgroundColor:"yellow", border:'red', height:'10px'}}>
                            </div>
                            <div id='four-star-void-bar' style={{width:`${void4}%`, backgroundColor:"grey", border:'red'}}>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="w30"><p>3 stars</p></div>
                        <div style={{width: '100%'}}>
                            <div id='three-star-filled-bar' style={{width:`${filled3}%`, backgroundColor:"orange", border:'red', height:'10px'}}>
                            </div>
                            <div id='three-star-void-bar'style={{width:`${void3}%`, backgroundColor:"grey", border:'red'}}>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="w30"><p>2 stars</p></div>
                        <div style={{width: '100%'}}>
                            <div id='two-star-filled-bar' style={{width:`${filled2}%`, backgroundColor:"orangered", border:'red', height:'10px'}}>
                            </div>
                            <div id='two-star-void-bar'style={{width:`${void2}%`, backgroundColor:"grey", border:'red'}}>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="w30"><p>1 stars</p></div>
                        <div style={{width: '100%'}}>
                            <div id='one-star-filled-bar' style={{width:`${filled1}%`, backgroundColor:"red", border:'red', height:'10px'}}>
                            </div>
                            <div id='one-star-void-bar'style={{width:`${void1}%`, backgroundColor:"grey", border:'red'}}>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ReviewInfo
