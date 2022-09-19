// Action Types

const GET_BIZ_REVIEWS = "biz/get-biz-reviews"
// const GET_USERS_REVIEWS = "biz/get-users-reviews"

const CREATE_REVIEW = "biz/create-review"
// const READ_REVIEW = "biz/read-review"
const UPDATE_REVIEW = "biz/update-review"
const DELETE_REVIEW = "biz/delete-review"
const ON_DELETE_CASCADE_REVIEWS = "biz/on-delete-cascade-review"

// Action Creators

const getBizReviewsAction = payload => {
    return {
        type: GET_BIZ_REVIEWS,
        payload
    }
}

// const getUsersReviewsAction = payload => {
//     return {
//         type: GET_USERS_REVIEWS,
//         payload
//     }
// }

const createReviewAction = payload => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}

// const readReviewAction = payload => {
//     return {
//         type: READ_REVIEW,
//         payload
//     }
// }

const updateReviewAction = payload => {
    return {
        type: UPDATE_REVIEW,
        payload
    }
}

const deleteReviewAction = payload => {
    return {
        type: DELETE_REVIEW,
        payload
    }
}

export const onDeleteCascadeReviewsAction = payload => {
    return {
        type: ON_DELETE_CASCADE_REVIEWS,
        payload
    }
}

// Thunk Action Creators
export const getBizReviewThunk = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`)
    const data = await response.json()

    if(response.ok){
        await dispatch(getBizReviewsAction(data))
    }
    return data
}

// export const getUserReviewThunk = (userId) => async dispatch => {
//     const response = await fetch(`/api/business/${userId}/reviews`)
// }

export const createReviewThunk = ({businessId, review}) => async dispatch => {
    console.log(businessId, review)
    const response = await fetch(
        `/api/businesses/${businessId}/reviews`,
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(createReviewAction(data))
    }

    return data
}

export const updateReviewThunk = ({reviewId, review}) => async dispatch => {
    const response = await fetch(
        `/api/review/${reviewId}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(updateReviewAction(data))
    }

    return data
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await fetch(
        `/api/review/${reviewId}`,
        {
            method: "DELETE",
        }
    )

    const data = await response.json()

    if(response.ok){
        await dispatch(deleteReviewAction(reviewId))
    }

    return data
}

// Reducer

const intitialState = {}

const reviewsReducer = (state = intitialState, action) => {
    let newState = {};
    switch (action.type) {
        case (GET_BIZ_REVIEWS): {
            console.log(action.payload)
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case (CREATE_REVIEW): {
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case (UPDATE_REVIEW): {
            newState = {...state}
            newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
            return newState
        }
        case (DELETE_REVIEW): {
            newState = { ...state };
            delete newState[action.payload]
            return newState
        }
        case (ON_DELETE_CASCADE_REVIEWS): {
            newState = { ...state };

            const reviews = Object.values(newState);

            reviews.forEach((review) => {
              if (review.bizId === action.payload) {
                delete newState[action.payload];
              }
            });

            return newState;
        }
        default: {
            return state
        }
    }
}

export default reviewsReducer
