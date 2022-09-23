import React, { useEffect, useState } from "react";
import { NavLink, Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditBizInfo from "./EditBusinessInfo/EditBusinessInfo";
import EditBizCategories from "./EditBusinessCategory/EditCategories";
import EditBizAmenities from "./EditBusinessAmmenity/EditAmenities";

import './index.css'

function UpdateBizForm({ business, setIsLoaded, bizCategories, bizAmenities, setBizCategories, setBizAmenities }) {
  const { url } = useRouteMatch()

  const sessionUser = useSelector(state => state.session.user)

  if (!sessionUser || (sessionUser.id !== business.ownderId)) {
    return <Redirect to={`/businesses/${business.id}/about`} />
  }

  return (
    <div>

      <div className="flex-row-justify-between flex-row-align-center">
        <NavLink className='NavLink' style={{color:"rgb(23,130,148)"}} to={`${url}/info`}>Edit info</NavLink>
        <NavLink className='NavLink' style={{color:"rgb(23,130,148)"}} to={`${url}/categories`}>Edit Categories</NavLink>
        <NavLink className='NavLink' style={{color:"rgb(23,130,148)"}} to={`${url}/amenities`}>Edit Amenities</NavLink>
      </div>
      <div>
        <Switch>
          <Route path={`${url}/info`}>
            <EditBizInfo business={business} setIsLoaded={setIsLoaded} />
          </Route>
          <Route path={`${url}/categories`}>
            <EditBizCategories
              business={business}
              bizCategories={bizCategories}
              setBizCategories={setBizCategories} />
          </Route>
          <Route path={`${url}/amenities`}>
            <EditBizAmenities
              business={business}
              bizAmenities={bizAmenities}
              setBizAmenities={setBizAmenities} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default UpdateBizForm
