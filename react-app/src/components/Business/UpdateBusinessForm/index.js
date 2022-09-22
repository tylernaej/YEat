import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditBizInfo from "./EditBusinessInfo/EditBusinessInfo";
import EditBizCategories from "./EditBusinessCategory/EditCategories";
import EditBizAmenities from "./EditBusinessAmmenity/EditAmenities";

import './index.css'

function UpdateBizForm({ business, setIsLoaded }) {
  const { url } = useRouteMatch()

  const sessionUser = useSelector(state => state.session.user)

  if (!sessionUser) {
    return (
      <div>
        PLEASE LOG IN TO CONTINUE
      </div>
    )
  }

  return (
    <div>
      <div className="edit-links-div">
        <NavLink to={`${url}/info`}>Edit info</NavLink>
        <NavLink to={`${url}/categories`}>Edit Categories</NavLink>
        <NavLink to={`${url}/amenities`}>Edit Amenities</NavLink>
      </div>
      <div>
        <Switch>
          <Route path={`${url}/info`}>
            <EditBizInfo business={business} setIsLoaded={setIsLoaded} />
          </Route>
          <Route path={`${url}/categories`}>
            <EditBizCategories business={business} />
          </Route>
          <Route path={`${url}/amenities`}>
            <EditBizAmenities business={business} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default UpdateBizForm
