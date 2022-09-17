import React from 'react';
import { NavLink } from 'react-router-dom';

function BizCard({ business }) {
    return (
        <p> {business.name} </p>
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
