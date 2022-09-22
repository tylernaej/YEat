import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCategories, postCategories} from '../../../../store/fetchFunctions'
import EditIndividualCategoryButton from "./EditIndividualCategoryButton";

function EditBizCategories({business}){
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const [categories, setCategories] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [checkedState, setCheckedState] = useState({})
    const id = Number(location.pathname.split('/')[2])

    useEffect(() => {
        getCategories()
        .then((data) => setCategories(data))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        let newState = {}
        console.log(`${business.categories}`)
        for(const category of business.categories){
            newState[`${category}`] = true
        }
        setCheckedState(newState)
    }, [])

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

    return isLoaded && (
        <div id="full-page-categories">
            <h3>What categories do you offer?</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div id="categories-form">
                        <div id="set-all-categories">
                            {categories.categories.map(category => (
                                <div key={`${category}`}>
                                    <EditIndividualCategoryButton
                                        included={business.categories.includes(category)}
                                        category={category}
                                        checkedState={checkedState}
                                        setCheckedState={setCheckedState}
                                    />
                                </div>
                            ))}
                        </div>
                        <div id="set-categories-button" className="flex-row-justify-between">
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBizCategories
