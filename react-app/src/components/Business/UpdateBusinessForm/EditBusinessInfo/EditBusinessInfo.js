import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateBizThunk, deleteBizThunk } from "../../../../store/business";
import { Modal } from '../../../../context/Modal'
import DeleteBiz from "./DeleteBusinessModal";
import DeleteBizButton from "./DeleteBusinessButton";

function EditBizInfo({ business, setIsLoaded }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { url } = useRouteMatch()

    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState(business ? business.name : '')
    const [email, setEmail] = useState(business ? business.email : '')
    const [phone, setPhone] = useState(business ? business.phone : '')
    const [website, setWebsite] = useState(business ? business.website : '')
    const [address, setAddress] = useState(business ? business.address : '')
    const [city, setCity] = useState(business ? business.city : '')
    const [state, setState] = useState(business ? business.state : '')
    const [zipcode, setZipcode] = useState(business ? business.zipcode : '')
    const [country, setCountry] = useState(business ? business.country : '')
    const [latitude, setLatitude] = useState(business ? business.latitude : '')
    const [longitude, setLongitude] = useState(business ? business.longitude : '')
    const [description, setDescription] = useState(business ? business.description : '')
    const [priceRange, setPriceRange] = useState(business ? business.priceRange : '')

    const [validationErrors, setValidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function onlyLetters(str) {
      return /^[a-zA-Z]+$/.test(String(str));
    }
    
    useEffect(() => {
      console.log("TESTESTEST", showModal);
    }, [showModal])

    useEffect(() => {
        const errors = []
        if (name.length > 50) errors.push("Name must be less than 50 characters");
        if (zipcode.length !== 5) errors.push("Zipcode must be 5 digits");
        if (longitude > 180 || longitude < -180) errors.push("Invalid longitude, please be between 180 and -180");
        if (latitude > 90 || latitude < -90) errors.push("Invalid Latitude, please be between 90 and -90");
        if (description.length < 10 || description.length > 2000) errors.push('Description must be between 10 and 2000 characters')
        if (onlyLetters(city)) errors.push("City can only include letters.");
        if (website.length > 500) errors.push("Website URL length too long.");
        if (!(/.(com|net|gov|org|io|tv)$/.test(website.split('/')[2]))){
          errors.push("Please submit a website url")
        setValidationErrors(errors)
        }
    }, [name, email, phone, website, address, city, state, zipcode, country, latitude, longitude, description, priceRange])

    if (!sessionUser) {
        return (
            <div>
                PLEASE LOG IN TO CONTINUE
            </div>
        )
    }

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

        const payload = { businessId: business.id, business: newBiz }

        const data = await dispatch(updateBizThunk(payload))
        if (data.statusCode){
          alert('Must be creator of review!')
          setValidationErrors([data.message])
          return
        }

        history.push(`/businesses/${business.id}/about`)

    }

    const handleDelete = async e => {
        e.preventDefault()
        setIsLoaded(false)
        const data = await dispatch(deleteBizThunk(business.id))
        if (data.statusCode) {
          setValidationErrors([data.message]);
        }
        history.push(`/businesses`)
    }

    const handleClick = e => {
      e.preventDefault()
      setShowModal(true)
      // console.log(e)
    }

    return (
      <div>
        {isSubmitted &&
          validationErrors.map((error) => <div className='error' key={error}><li>{error}</li></div>)}
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
            <label htmlFor="description">Description</label>
            <textarea
              rows='13'
              cols='76'
              required
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div id="edit-business-buttons">
            <>
              {/* <button onClick={handleDelete}>Delete</button> */}
              <button onClick={handleClick}>Delete</button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <DeleteBizButton business={business} setIsLoaded={setIsLoaded} setValidationErrors={setValidationErrors} setShowModal={setShowModal}/>
                </Modal>
              )}
            </>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}

export default EditBizInfo
