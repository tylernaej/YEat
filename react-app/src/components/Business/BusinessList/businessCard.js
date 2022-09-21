import React from 'react';
import { NavLink } from 'react-router-dom';
import "./businessCard.css"


function BizCard({ business }) {
    console.log(`Loading a biz card for: ${business.name}`)
    return (
        <div className='each-card'>
            <NavLink className="flex-row navLink" to={`/businesses/${business.id}/about`}>
                <div style={{height: "205px", minWidth:"205px", border:"1px red solid"}}>
                    <img src='https://wallpapercave.com/wp/wp2416473.jpg' style={{objectFit: "cover", height:"205px", width:"205px"}} alt=''/>
                    {/* photo here */}
                </div>
                <div>
                    <p> {business.name} </p>
                    <div class="stars-outer">
                        <div class="stars-inner" style={{width: `${(business.avgReviews / 5) * 100}%`}}></div>
                    </div>
                    <div className='flex-row'>
                        {business.categories.slice(0,3).map(category => (
                            <div>{category}</div>
                        ))}
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
