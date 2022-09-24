import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCategories, postCategories} from '../../../../store/fetchFunctions'
import IndividualCategoryButton from "./IndividualCategoryButton";
import './SetCategory.css'

function SetBizCategories({business}){
    const location = useLocation()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [checkedState, setCheckedState] = useState({})
    const history = useHistory()
    const id = Number(location.pathname.split('/')[2])

    useEffect(() => {
        getCategories()
        .then((data) => setCategories(data))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault()
        let categoryPayload = {}
        for (const category in checkedState){
            categoryPayload[`${category}`] = true
        }
        const request = {id, categoryPayload}

        await dispatch(postCategories(request))

        history.push(`/businesses/${id}/about`)
    }

    const handleBack = () => {
        history.push(`/create-business/${id}/amenities`)
    }

    return isLoaded &&  (
        <div id="full-page-categories">
            <h3>What does your business offer?</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div id="categories-form">
                        <div id="set-all-categories">
                            {categories.categories.map(category => (
                                <div key={`${category}`}>
                                    <IndividualCategoryButton
                                        category={category}
                                        checkedState={checkedState}
                                        setCheckedState={setCheckedState}
                                    />
                                </div>
                            ))}
                        </div>
                        <div id="set-categories-button" className="flex-row-justify-between">
                            <button onClick={handleBack}>Go Back</button>
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetBizCategories
