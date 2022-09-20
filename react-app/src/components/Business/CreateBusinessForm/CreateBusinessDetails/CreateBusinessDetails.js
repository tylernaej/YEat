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

        // front end error handling here

        setValidationErrors(errors)

    }, [name, email, phone, website, address, city, state, zipcode, country, latitude, longitude, description, priceRange])

    if (!sessionUser) return <Redirect to="/login" />


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
            country,
            latitude,
            longitude,
            description,
            priceRange
        }

        const data = await dispatch(createBizThunk(newBiz))

        history.push(`/create-business/${data.id}/amenities`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input required type="tel" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="website">Website URL</label>
                    <input required type="url" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input required type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input required type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input required type="text" name="state" value={state} onChange={e => setState(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="zipcode">Zipcode</label>
                    <input required type="number" name="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input required type="text" name="country" value={country} onChange={e => setCountry(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input required type="number" name="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude</label>
                    <input required type="number" name="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea required type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="priceRange">Price Range</label>
                    <input required type="number" name="priceRange" value={priceRange} onChange={e => setPriceRange(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SetBizDetails
