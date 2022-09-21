import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createBizThunk } from "../../../../store/business";

function SetBizDetails() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

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

    useEffect(() => {
        const errors = []
        if (name.length > 50) errors.push("Name must be less than 50 characters");
        if (zipcode.length !== 5) errors.push("Zipcode must be 5 digits");
        if (longitude > 180 || longitude < -180) errors.push("Invalid longitude, please be between 180 and -180");
        if (latitude > 90 || latitude < -90) errors.push("Invalid Latitude, please be between 90 and -90");
        if (description.length < 10 || description.length > 2000) errors.push('Description must be between 10 and 2000 characters')

        // front end error handling here

        setValidationErrors(errors)

    }, [name, email, phone, website, address, city, state, zipcode, country, latitude, longitude, description, priceRange])

    if (!sessionUser) return <Redirect to="/login" />

    // console.log(`this is the latitude ${latitude}`)
    // console.log(`this is the longitude ${longitude}`)


    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitted(true)
        // console.log(`this is the validation errors on handle submit`, validationErrors)

        if (validationErrors.length > 0) return

        // console.log(`this is the validation errors on handle submit after if statement`, validationErrors)

        const newBiz = {
            name,
            email,
            phone,
            website,
            address,
            city,
            state,
            zipcode,
            country,
            latitude,
            longitude,
            description,
            priceRange
        }

        const data = await dispatch(createBizThunk(newBiz))
        console.log('this is the console log of data',data)

        history.push(`/create-business/${data.id}/amenities`)
    }

    return (
      <div>
        {isSubmitted &&
          validationErrors.map((error) => <div key={error}>{error}</div>)}
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
            <label htmlFor="phone">Phone: (Format: (123)456-7890)</label>
            <input
              required
              type="tel"
              pattern="^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
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
          <div>
            <label htmlFor="country">Country</label>
            <input
              required
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
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
            <label htmlFor="description">Description</label>
            <textarea
              required
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="priceRange">Price Range</label>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}

export default SetBizDetails