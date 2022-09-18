import React from 'react';
import { NavLink } from 'react-router-dom';

function BizCard({ business }) {
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
