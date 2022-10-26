import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createReviewThunk } from "../../store/reviews";
import { awsUpload } from "../../store/fetchFunctions";
import './CreateReviewForm.css'

function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { businessId } = useParams()
    const location = useLocation()

    // const [image, setImage] = useState('')
    // const [awsImages, setAwsImages] = useState([])
    // const [imageLoading, setImageLoading] = useState(false);
    // const [imagesArr, setImagesArr] = useState([])
    // const [fileName, setFileName] = useState('')


    const businessId = location.pathname.split('/')[2]
    // console.log(businessId)
    // const business = useSelector((state) => console.log(state))
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewsLst = Object.values(reviews)
    // console.log(reviewsLst)
    let checkUser = sessionUser ? reviewsLst.find(review => review.userId === sessionUser.id) : undefined
    // console.log(sessionUser)
    // console.log(checkUser)

    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')

    const [validationErrors, setValidationErrors] = useState([]);
    // const [backendErrors, setBackendErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (review.length < 10 || review.length > 2000) errors.push("Review length must be between 10 and 2000 characters")
        if (!rating) errors.push('Please provide a rating')

        setValidationErrors(errors)
    }, [rating, review])

    useEffect(() => {
      if(sessionUser.id === location.business?.business?.ownerId){
        history.push(`/businesses/${businessId}/reviews`)
      }
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault()

        setHasSubmitted(true)

        if(validationErrors.length > 0) return

        const newReview = {
            rating,
            review
        }

        const reviewer = { firstName: sessionUser.firstName, lastName: sessionUser.lastName, profilePicture: sessionUser.profilePicture}

        const payload = {businessId, review: newReview, reviewer}

        const data = await dispatch(createReviewThunk(payload))
        // .then((data) => fetch(
        //     `/api/reviews/${data.id}/images`,
        //     {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({'images': imagesArr})
        //     }
        // ))

        if(data.statusCode){
          setValidationErrors([data.message])

          return
        }
        // if(statusCode)

        history.push(`/businesses/${businessId}/reviews`)
    }
    // console.log(rating)
    if(checkUser){
      // <Redirect to={`/businesses/${businessId}/edit-review`}/>
      history.push(`/businesses/${businessId}/edit-review`)
    }

    // const addImage = async (e) => {
    //   const imgData = new FormData();
    //     imgData.append("image", image)

    //     setImageLoading(true)

    //     let awsData = await awsUpload(imgData)
    //     .then((awsData) => {
    //       setImagesArr([...imagesArr, awsData.url])
    //     })
    //     .then(() => setImageLoading(false))

    //     setFileName('')
    // }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //     if (document.getElementById("image-input")) {
    //       setFileName(
    //         // document.getElementById("image-input")?.value.split("\\")[2]
    //         file.name
    //       );
    //     }
    // }

    return (
      <div className="whole-bottom-page">
        <div>
          <h3>Write review here!</h3>
        </div>
        {hasSubmitted &&
          validationErrors.map((error) => (
            <div className="error" key={error}>
              <li>{error}</li>
            </div>
          ))}
        <div className="whole-review-form">
          <form onSubmit={handleSubmit}>
            <div id="rating-div" className="rating">
              {/* <div className="rating"> */}
              <input
                type="radio"
                name="rating"
                value="5"
                id="5"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="5">☆</label>
              <input
                type="radio"
                name="rating"
                value="4"
                id="4"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="4">☆</label>
              <input
                type="radio"
                name="rating"
                value="3"
                id="3"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="3">☆</label>
              <input
                type="radio"
                name="rating"
                value="2"
                id="2"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="2">☆</label>
              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="1">☆</label>
            </div>
            {/* </div> */}
            <div id="review-div">
              {/* <label htmlFor="review">Review</label> */}
              <textarea
                id="review-input"
                required
                placeholder="The ramen here is perfect! The prices are really great too. I like the system where they let you choose any toppings and all of the soup bases are really great. I like no matter which mixes of bases and toppings you get they always mix well. I would suggest to get green onions and eggs on top of your ramen it really pulls and melts everything together. This place is a perfect place to have a casual date with your significant other, especially if you go at night because of the lights that turn on that are hung out side of the restaurant it really adds a romantic setting to the atmosphere."
                type="text"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            {/* {imagesArr && (
              <div className="images-map-outer">
                {imagesArr.map((image, i) => (
                  <div className="images-map" key={i}>
                    <img className="review-image" src={image} alt=''/>
                  </div>
                ))}

              </div>
            )} */}
            <div id="image-submit">
              <div id="button-div">
                <button type="submit">
                  Submit
                </button>
              </div>
              {/* {imagesArr.length < 3 && (
                <div id="button-div">
                  <label id="image-label" htmlFor="image-input">Add Images</label>
                  <input 
                    type="file"
                    accept="images/jpg"
                    id="image-input"
                    onChange={updateImage}
                  />
                  <div id="file-name">{fileName ? fileName : null}</div>
                  <div onClick={image ? addImage : null} className={image ? 'has-image' : 'no-image'}>
                    Post Image
                  </div>
                  {imageLoading && (
                    <p>Loading...</p>
                  )}
              </div>
              )} */}
            </div>
            
          </form>
        </div>
      </div>
    );
}

export default ReviewForm
