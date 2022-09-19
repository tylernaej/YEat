import React from 'react';
import { NavLink } from 'react-router-dom';

function BizCard({ business }) {
    console.log(`Loading a biz card for: ${business.name}`)
    return (
        <NavLink to={`/businesses/${business.id}/about`}>
            <p> {business.name} </p>
        </NavLink>
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
