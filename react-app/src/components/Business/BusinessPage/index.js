import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useParams, useRouteMatch, Redirect } from "react-router-dom";

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
import BizNavBar from "./BusinessNavBar";


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
            <div id="business-header" className="">
                <HeaderInfo business={business} />
            </div>
            <div>
                <BizNavBar business={business} />
            </div>
            <div className="w100 flex-row-center">
                <div className="w1070px flex-row-center">
                    <div className="w70">
                        <Switch>
                            <Route path={`${url}/about`}>
                                <AboutInfo business={business} />
                                <AmenityInfo business={business} />
                                <ReviewInfo business={business} />
                                {/* <ReviewsList business={business} /> */}
                            </Route>
                            <Route path={`${url}/reviews`}>
                                <div>
                                    <ReviewInfo business={business} />
                                    <ReviewsList business={business} />
                                </div>
                            </Route>
                            <Route path={`${url}/photos`}>
                                Photo feature not implemented yet
                            </Route>
                            <Route path={`${url}/edit`}>
                                <UpdateBizForm business={business} />
                            </Route>
                        </Switch>
                    </div>
                    <div className="w30">
                        <ContactInfo business={business} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default BizPage
