import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";

import { readBizThunk } from "../../../store/business";
import { getBizReviewThunk } from "../../../store/reviews";

//components
import AboutInfo from "./AboutInfo";
import AmenityInfo from "./AmenityInfo";
import ContactInfo from "./ContactInfo";
import HeaderInfo from "./HeaderInfo";
import ReviewInfo from "./ReviewInfo";
import ReviewsList from "../../Reviews/ReviewList";
import UpdateBizForm from "../UpdateBusinessForm";


function BizPage() {
    const { businessId } = useParams()
    const { url } = useRouteMatch()

    const dispatch = useDispatch()

    const businesses = useSelector(state => state.businesses)
    const business = businesses[Number(businessId)]

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(readBizThunk(businessId))
            // .then(() => dispatch(getBizReviewThunk(businessId)))
            .then(() => setIsLoaded(true))

        // make another fetch request for reviews of the business for more information
        // add this when doing feature 2 - reviews
    }, [dispatch])

    return isLoaded && (
        <div>
            <div className="w100 flex-row-center">
                <div className="w40">
                    <HeaderInfo business={business} />
                </div>
            </div>
            <div>
                <div className="w100 flex-row-center">
                    <Switch>
                        <Route path={`${url}/about`}>
                            <div className="w1070px flex-row">
                                <div className="w70">
                                    <AboutInfo business={business} />
                                    <AmenityInfo business={business} />
                                    <ReviewInfo business={business} />
                                    <ReviewsList business={business} />
                                </div>
                                <div className="w30">
                                    <ContactInfo business={business} />
                                </div>
                            </div>
                        </Route>
                        <Route path={`${url}/edit`}>
                            <UpdateBizForm business={business} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>

    )
}

export default BizPage
