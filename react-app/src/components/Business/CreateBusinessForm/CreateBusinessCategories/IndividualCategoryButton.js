import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function IndividualCategoryButton({category, checkedState, setCheckedState}){
    const [categoryChecked, setCategoryChecked] = useState(false)
    const isMounted = useRef(false);

    const handleChecked = async e => {
        setCategoryChecked(current => !current)
    }

    useEffect(() => {
        if (isMounted.current) {
            let newState = {...checkedState}
            if(`${category}` in  newState && !categoryChecked){
                delete newState[`${category}`]
            }
            if(categoryChecked){
                newState[`${category}`] = categoryChecked
            }
            setCheckedState(newState)
        } else {
            isMounted.current = true;
        }
    }, [categoryChecked])

    return (
        <div>
            <label htmlFor={`${category}`}>{category}</label>
            <input 
                type="checkbox" 
                name={`${category}`} 
                value={`${categoryChecked}`} 
                onClick={handleChecked} 
            />        
        </div>
    )
}

export default IndividualCategoryButton