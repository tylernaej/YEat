import React from 'react';
import { NavLink } from 'react-router-dom';
import "./businessCard.css"

function dollarsigns(range) {
  let signs = "";
  for (let i = 0; i < Number(range); i++) {
    signs = signs.concat("$");
  }
  return signs;
}


function BizCard({ business }) {
    console.log(business)
    console.log(`${(business.avgReviews / 5) * 100}`)
    const price = dollarsigns(business.priceRange);
    return (
        <div className='each-card'>
            <NavLink className="flex-row navLink" to={`/businesses/${business.id}/about`}>
                <div style={{height: "205px", minWidth:"205px"}}>
                    <img src='https://wallpapercave.com/wp/wp2416473.jpg' style={{objectFit: "cover", height:"205px", width:"205px"}} alt=''/>
                    {/* photo here */}
                </div>
                <div className='biz-card-right-side'>
                    <div className='biz-card-name'> {business.name} </div>
                    <div className='review-section'>
                        <div class="stars-outer">
                            <div class="stars-inner" style={{width: `${(business.avgReviews / 5) * 100}%`}}></div>
                        </div>
                        <div>{business.numReviews}</div>
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
