import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCategories, postCategories} from '../../../../store/fetchFunctions'
import IndividualCategoryButton from "./IndividualCategoryButton";

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
        console.log(`In Submit!`)
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
        <div>
            <div>Set Catgories Here</div>
            <div>
                <form onSubmit={handleSubmit}>
                    {categories.categories.map(category => (
                        <div key={`${category}`}>
                            <IndividualCategoryButton 
                                category={category} 
                                checkedState={checkedState} 
                                setCheckedState={setCheckedState}
                            />
                        </div>
                    ))}
                    <button onClick={handleBack}>Go Back</button>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SetBizCategories