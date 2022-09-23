import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import "./businessCard.css"

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

function dollarsigns(range) {
  let signs = "";
  for (let i = 0; i < Number(range); i++) {
    signs = signs.concat("$");
  }
  return signs;
}


function BizCard({ business }) {

    const sessionUser = useSelector(state => state.session.user)
    const location = useLocation()

    const bizDefaultImg = defaultImages[business.id % defaultImages.length]
    const price = dollarsigns(business.priceRange);
    // console.log(business.reviews)

    if (location.pathname.split('/')[1] === 'writeareview'){
        return (
          <div className="each-card">
            <NavLink
              className="flex-row navLink w100"
              to={ `/businesses/${business.id}/create-review`}
            >
              <div style={{ height: "205px", minWidth: "205px" }}>
                <img
                  src={`${business.images?.length ? business.images[0].url : bizDefaultImg}`}
                  style={{
                    objectFit: "cover",
                    height: "205px",
                    width: "205px",
                  }}
                  alt=""
                />
                {/* photo here */}
              </div>
              <div className="biz-card-right-side">
                <div className="biz-card-name"> {business.name} </div>
                <div className="review-section">
                  <div class="stars-outer">
                    <div
                      class="stars-inner"
                      style={{ width: `${(business.avgReviews / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="num-reviews">
                    {business.numReviews
                      ? business.numReviews
                      : "No reviews yet"}
                  </div>
                </div>
                <div className="flex-row-align-center">
                  {business.categories.slice(0, 3).map((category) => (
                    <>
                      {/* <div key={category} className='biz-card-category'>{category}</div> */}
                      <NavLink
                        className="navLink biz-card-category"
                        to={`/businesses/search?name=${category}&category=${category}`}
                      >
                        {category}
                      </NavLink>
                    </>
                  ))}
                  <div style={{ color: "green" }}>{price}</div>
                </div>
                <div>
                  <div className="biz-description">
                    "{business.description}"
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            </NavLink>
          </div>
        );
    }

    return (
        <div className='each-card'>
                <NavLink className="flex-row navLink" to={`/businesses/${business.id}/about`}>
                    <div style={{height: "205px", minWidth:"205px"}}>
                        <img
                        src={`${business.images?.length ? business.images[0].url : bizDefaultImg}`}
                        style={{objectFit: "cover", height:"205px", width:"205px"}} alt=''/>
                        {/* photo here */}
                    </div>
                    <div className='biz-card-right-side'>
                        <div className='biz-card-name'> {business.name} </div>
                        <div className='review-section'>
                            <div class="stars-outer">
                                <div class="stars-inner" style={{width: `${(business.avgReviews / 5) * 100}%`}}></div>
                            </div>
                            <div className='num-reviews'>{business.numReviews ? business.numReviews : 'No reviews yet'}</div>
                        </div>
                        <div className='flex-row-align-center'>
                            {business.categories.slice(0,3).map(category => (
                                <>
                                    {/* <div key={category} className='biz-card-category'>{category}</div> */}
                                    <NavLink className='navLink biz-card-category' to={`/businesses/search?name=${category}&category=${category}`}>{category}</NavLink>
                                </>
                            ))}
                            <div style={{color: 'green'}}>{price}</div>
                        </div>
                        <div>
                            <div className='biz-description'>"{business.description}"</div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </NavLink>
        </div>
        // <div>
        //     <NavLink to={`/businesses/${biz.id}`}>
        //         <div></div>
        //         <div>
        //             <div>
        //                 <div></div>
        //                 <div></div>
        //                 <span></span>
        //             </div>
        //             <div></div>
        //             <div></div>
        //             <div></div>
        //             <div></div>
        //         </div>
        //     </NavLink>
        // </div>
    )
}

export default BizCard
