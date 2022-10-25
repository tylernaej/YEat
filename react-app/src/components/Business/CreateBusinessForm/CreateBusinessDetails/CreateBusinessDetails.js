import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { phoneNumberFormatter } from "./PhoneNumberFormat";
import { createBizThunk } from "../../../../store/business";
import './CreateBusiness.css'
import PopulateValidBizDetails from "../AutopopulateButtons/PopulateValidBizDetails";
import PopulateInvalidBizDetails from "../AutopopulateButtons/PopulateInvalidBizDetails";

function SetBizDetails() {
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)

  const [populatedValidDetails, setPopulatedValidDetails] = useState({pressed:false,businessDetails:{}})
  const isMounted = useRef() 

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  function onlyLetters(str) {
    return /^[a-zA-Z\s]*$/.test(str);
  }

  useEffect(() => {
    const formattedPhone = phoneNumberFormatter(phone)
    setPhone(formattedPhone)
  }, [phone])

  useEffect(() => {
    const errors = []
    if (name.length > 50) errors.push("Name must be less than 50 characters.");
    if (zipcode.length !== 5) errors.push("Zipcode must be 5 digits.");
    if (longitude > 180 || longitude < -180) errors.push("Invalid longitude, please be between 180 and -180.");
    if (latitude > 90 || latitude < -90) errors.push("Invalid Latitude, please be between 90 and -90.");
    if (description.length < 10 || description.length > 2000) errors.push('Description must be between 10 and 2000 characters.')
    if (!onlyLetters(city)) errors.push("City can only include letters.")
    if (website.length > 500) errors.push("Website URL length too long.")
    if (!(/.(com|net|gov|org|io|tv)$/.test(website.split('/')[2]))){
      errors.push("Please submit a website url")
    }
    setValidationErrors(errors)

  }, [name, email, phone, website, address, city, state, zipcode, country, latitude, longitude, description, priceRange])

  useEffect(() => {
    if(isMounted.current){
      setName(populatedValidDetails.businessDetails.name)
      setEmail(populatedValidDetails.businessDetails.email)
      setPhone(populatedValidDetails.businessDetails.phone)
      setWebsite(populatedValidDetails.businessDetails.website)
      setAddress(populatedValidDetails.businessDetails.address)
      setCity(populatedValidDetails.businessDetails.city)
      setState(populatedValidDetails.businessDetails.state)
      setZipcode(populatedValidDetails.businessDetails.zipcode)
      setCountry(populatedValidDetails.businessDetails.country)
      setLatitude(populatedValidDetails.businessDetails.latitude)
      setLongitude(populatedValidDetails.businessDetails.longitude)
      setDescription(populatedValidDetails.businessDetails.description)
      setPriceRange(populatedValidDetails.businessDetails.priceRange)
    }
    else {
      isMounted.current = true
    }
  }, [populatedValidDetails])

  const handleSubmit = async e => {
    e.preventDefault()

    setIsSubmitted(true)

    if (validationErrors.length > 0) return
    
    const newBiz = {
      name,
      email,
      phone,
      website,
      address,
      city,
      state,
      zipcode,
      country: 'USA',
      latitude,
      longitude,
      description,
      priceRange
    }

    const data = await dispatch(createBizThunk(newBiz))

    if(data.statusCode){
      setValidationErrors([data.message])

      return
    }

    history.push(`/create-business/${data.id}/images`)
  }

  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div>
      <h2>First, let's get a little information about your business... (Step 1 of 3)</h2>
      <div style={{color:"red", marginBottom:"10px"}}>
      {isSubmitted &&
        validationErrors.map((error) => <div key={error}>{error}</div>)}
        </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website URL</label>
          <input
            required
            type="url"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            required
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            required
            type="number"
            name="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="country">Country</label>
          <input
            required
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div> */}
        <div>
          <label htmlFor="latitude">Latitude</label>
          <input
            required
            type="number"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input
            required
            type="number"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priceRange">Price Range (1 - 4)</label>
          <input
            required
            type="number"
            min={1}
            max={4}
            name="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div>
          <div className="flex-row">
            <label htmlFor="description">Description</label>
            {description && (
              <div id='characters-remaining'> - {2000 - description.length} characters remaining</div>
            )}
          </div>
          <textarea
            required
            rows='13'
            cols='76'
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div id="create-business-button">
          <button id="submit-button" type="submit">Continue</button>
          <PopulateValidBizDetails 
            populatedValidDetails={populatedValidDetails}
            setPopulatedValidDetails={setPopulatedValidDetails}
          />
          <PopulateInvalidBizDetails 
            populatedValidDetails={populatedValidDetails}
            setPopulatedValidDetails={setPopulatedValidDetails}
          />
        </div>
      </form>
    </div>
  );
}

export default SetBizDetails
