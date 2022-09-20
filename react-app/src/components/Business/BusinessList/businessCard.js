import React from 'react';
import { NavLink } from 'react-router-dom';

function BizCard({ business }) {
    console.log(`Loading a biz card for: ${business.name}`)
    return (
        <div  style={{border: "1px red solid", height:"270px", width:"780px"}}>
            <NavLink className="flex-row" to={`/businesses/${business.id}/about`}>
                <div style={{height: "205px", minWidth:"205px", border:"1px red solid"}}>
                    <img src='https://wallpapercave.com/wp/wp2416473.jpg' style={{objectFit: "cover", height:"205px", width:"205px"}}/>
                    {/* photo here */}
                </div>
                <div>
                    <p> {business.name} </p>
                    <p> {business.avgReviews ? business.avgReviews : 0} - {business.numReviews ? business.numReviews : 0} Reviews</p>
                    <div className='flex-row'>
                        {business.categories.slice(0,3).map(category => (
                            <div>{category}</div>
                        ))}
                    </div>
                    <div>
                        <p>{business.description}</p>
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
