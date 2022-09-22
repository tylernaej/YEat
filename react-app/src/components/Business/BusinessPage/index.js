import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useParams, useRouteMatch, Redirect } from "react-router-dom";

import { readBizThunk } from "../../../store/business";

//components
import AboutInfo from "./AboutInfo";
import AmenityInfo from "./AmenityInfo";
import ContactInfo from "./ContactInfo";
import HeaderInfo from "./HeaderInfo";
import ReviewInfo from "./ReviewInfo";
import ReviewsList from "../../Reviews/ReviewList";
import UpdateBizForm from "../UpdateBusinessForm";
import BizNavBar from "./BusinessNavBar";
import ReviewForm from "../../Reviews/CreateReviewForm";
import UpdateReviewForm from "../../Reviews/UpdateReviewForm";

import './businesspage.css'
import { getBizReviewThunk } from "../../../store/reviews";


function BizPage() {
    const { businessId } = useParams()
    const { url } = useRouteMatch()

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const businesses = useSelector(state => state.businesses)
    const business = businesses[Number(businessId)]

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)

    const usersReview = sessionUser ? reviewsList.find(review => review.userId === sessionUser.id) : undefined

    const [isLoaded, setIsLoaded] = useState(false)
    const [bizAmenities, setBizAmenities] = useState([])
    const [bizCategories, setBizCategories] = useState([])

    useEffect(() => {
        dispatch(readBizThunk(businessId))
            .then((data) => {
                setBizAmenities(data.amenities || [])
                return data
            })
            .then((data) => setBizCategories(data.categories || []))
            .then(() => dispatch(getBizReviewThunk(businessId)))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    // console.log(bizCategories)
    // console.log(bizAmenities)

    if (!business) {
        return <h1>404 Business not found</h1>
        // <Redirect to={'/'}/>
    }

    return isLoaded && (
        <div>
            <div id="business-header" className="">
                <HeaderInfo business={business} reviewsList={reviewsList} bizCategories={bizCategories} />
            </div>
            <div id="business-body">
                <BizNavBar business={business} />

                <div className="w1070px flex-row-center">
                    <div className="w70 verticalMargin15">
                        <Switch>
                            <Route path={`${url}/about`}>
                                <AboutInfo business={business} bizCategories={bizCategories} />
                                <AmenityInfo business={business} bizAmenities={bizAmenities} />
                                <ReviewInfo business={business} reviewsList={reviewsList} usersReview={usersReview} />
                                {/* <ReviewsList business={business} /> */}
                            </Route>
                            <Route path={`${url}/reviews`}>
                                <div>
                                    <ReviewInfo business={business} reviewsList={reviewsList} usersReview={usersReview} />
                                    <ReviewsList reviewsList={reviewsList} />
                                </div>
                            </Route>
                            {/* <Route path={`${url}/photos`}>
                                Photo feature not implemented yet
                            </Route> */}
                            <Route path={`${url}/edit`}>
                                <UpdateBizForm
                                    business={business}
                                    setIsLoaded={setIsLoaded}
                                    bizAmenities={bizAmenities}
                                    bizCategories={bizCategories}
                                    setBizCategories={setBizCategories}
                                    setBizAmenities={setBizAmenities} />
                            </Route>
                            <Route path={`${url}/create-review`}>
                                <ReviewForm />
                            </Route>
                            <Route path={`${url}/edit-review`}>
                                <UpdateReviewForm usersReview={usersReview} />
                            </Route>
                        </Switch>
                    </div>
                    <div className="w30">
                        {window.location.pathname.split('/')[3] !== 'edit' && (
                            <ContactInfo business={business} />
                        )}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default BizPage
