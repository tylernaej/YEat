import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

function DropDownBizInfo({business}){

    return  (
        <div>
            <NavLink to={`/businesses/${business.id}/about`}>
                {business.name}
                {business.address}
            </NavLink>
        </div>
    )
}

export default DropDownBizInfo