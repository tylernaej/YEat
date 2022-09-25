import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import { getBizThunk, getUsersBizThunk } from "../../../../store/business";
import DropDownBizInfo from "./DropDownBizInfo";
import './SearchBar.css'

function SearchBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [dropDown, setDropDown] = useState(false)
  const [userInput, setUserInput] = useState("")
  const businesses = useSelector(state => state.businesses)
  const [bizMatches, setBizMatches] = useState({})

  const toggleDropDown = (e) => {
      setDropDown(true)
  }

  useEffect(() => {
    const closeMenu = (e) => {
        if(dropDown && e.target.id !== 'search-bar'){
            setUserInput("")
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
    let bizSet = {...businesses}
    let bizSetOutgoing = {}
    for (const business of Object.values(businesses)){
      let addedByName = false
      if(business.name.toLowerCase().includes(e.target.value.toLowerCase())){
        delete bizSet[business.id]
        bizSetOutgoing[business.id] = business
        addedByName = true
      }
      if(!addedByName){
        for (const category of business.categories){
          if(category.toLowerCase().includes(e.target.value.toLowerCase())){
            bizSetOutgoing[business.id] = business
            delete bizSet[business.id]
          }
        }
      }
    }
    setBizMatches(bizSetOutgoing)
  }

  let handleSubmit = async e =>{
    e.preventDefault()
    let params = {'name': userInput, 'category': userInput}
    await dispatch(getBizThunk(params))
    setUserInput("")
    setDropDown(false)
    const query = new URLSearchParams(params)
    history.push(`/businesses/search?${query.toString()}`)
  }

  if (location.pathname.split('/')[2] === 'reviews'){
      handleSubmit = async e => {
        e.preventDefault()
        let params = { name: userInput, category: userInput };
        await dispatch(getBizThunk(params));
        setUserInput("");
        const reviewBizQuery = new URLSearchParams(params)
        history.push(`/writeareview/search?${reviewBizQuery.toString()}`)
      }
  }

  let bizMatchesArray = Object.values(bizMatches)
  let results = Array.from(bizMatchesArray).slice(0,5)
  if(Array.from(bizMatchesArray).length > 5) results.push({endcard: 'See all Results'})
 
  return (
    <div id="search-bar-container-container"> 
        <div id={location.pathname.split('/')[2] === 'reviews' ? 'review-search-bar-container' : 'search-bar-container'} onClick={toggleDropDown}>
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
                  autoComplete="off"
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
              <div id={location.pathname.split('/')[2] === 'reviews' ? 'review-drop-down' : 'drop-down'}>
                {results.map(business => (
                  <div >
                    <DropDownBizInfo business={business} setUserInput={setUserInput} userInput={userInput} />
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