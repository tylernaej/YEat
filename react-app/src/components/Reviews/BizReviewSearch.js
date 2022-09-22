import React from "react";
// import { NavLink } from "react-router-dom";
import SearchBar from "../NavBar/NavBarComponents/SearchBar/SearchBar";
import './BizReviewSearch.css'


function BizReviewSearch(){
    return(
        <div className="biz-review-search-page">
            <div id="where-would-you-like-to-review">
                Where would you like to review?
            </div>

            <div>
                <SearchBar />
            </div>
        </div>
    )
}

export default BizReviewSearch