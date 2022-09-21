import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getBizThunk, getUsersBizThunk } from "../../../../store/business";
import DropDownBizInfo from "./DropDownBizInfo";
import './SearchBar.css'

function SearchBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [dropDown, setDropDown] = useState(false)
  const [userInput, setUserInput] = useState("")
  const businesses = useSelector(state => state.businesses)
  const [bizMatches, setBizMatches] = useState([])

  const toggleDropDown = (e) => {
      setDropDown(true)
  }

  useEffect(() => {
    const closeMenu = (e) => {
        console.log(e.target.id)
        if(dropDown && e.target.id != 'search-bar'){
            setDropDown(false)
        }
    }
    document.addEventListener('click', closeMenu)
    setBizMatches([])
    return () => document.removeEventListener('click', closeMenu)
  }, [dropDown])

  const inputHandler = (e) => {
    e.preventDefault()
    setUserInput(e.target.value)
    let bizSet = new Set()
    for (const business of Object.values(businesses)){
      if (business.name.toLowerCase().includes(e.target.value.toLowerCase())){
        bizSet.add(business)
      }
      for (const category of business.categories){
        if (category.toLowerCase().includes(e.target.value.toLowerCase())){
          bizSet.add(business)
        }
      }
    }
    setBizMatches(bizSet)
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    let params = {'name': userInput, 'category': userInput}
    await dispatch(getBizThunk(params))
    setUserInput("")
    const query = new URLSearchParams(params)
    history.push(`/businesses/search?${query.toString()}`)
  }


  return (
    <div> 
        <div id='search-bar-container' onClick={toggleDropDown}>
          <div>
            <div id='search-form-container'>
              <form 
                onSubmit={handleSubmit} 
                action="/" 
                method="GET" 
                className="flex-row-align-center"
                id='search-form'
              >
                <label htmlFor='search-bar' id='search-form'></label>
                <input
                  type='text'
                  id="search-bar"
                  placeholder="tacos, pizza, Max's..."
                  onChange={inputHandler}
                  value={userInput}
                />
                <div 
                  type='submit' 
                  id='magnifying-glass'
                  onClick={handleSubmit}
                >
                  <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                </div>
              </form>
            </div>
            {dropDown && (
              <div id='drop-down'>
                {Array.from(bizMatches).map(business => (
                  <div >
                    <DropDownBizInfo business={business}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default SearchBar;