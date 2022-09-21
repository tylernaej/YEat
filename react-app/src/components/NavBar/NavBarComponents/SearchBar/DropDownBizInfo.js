import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import './DropDownBizInfo.css'

function DropDownBizInfo({business}){

    return  (
        <div>
            <NavLink to={`/businesses/${business.id}/about`}>
                <div className="flex-row" id='individual-result'>
                    <div id='result-image'>
                        Image Here
                    </div>
                    <div id='result-details'>
                        <div>
                            {business.name}
                        </div>
                        <div>
                            {business.address}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default DropDownBizInfo