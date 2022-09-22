import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createBizThunk } from "../../../store/business";
import SetBizAmenities from "./CreateBusinessAmenities/SetAmenities";
import SetBizCategories from "./CreateBusinessCategories/SetCategories";
import SetBizDetails from "./CreateBusinessDetails/CreateBusinessDetails";

function BizForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { url } = useRouteMatch()

    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return <Redirect to="/login" />

    return (
        <div className="flex-row-center">
            <div>
                <Switch>
                    <Route path={`${url}/details`}>
                        <SetBizDetails />
                    </Route>
                    <Route path={`${url}/:bizId/amenities`}>
                        <SetBizAmenities />
                    </Route>
                    <Route path={`${url}/:bizId/categories`}>
                        <SetBizCategories />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default BizForm
