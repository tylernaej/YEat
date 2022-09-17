// Action Types

const GET_BIZ_REVIEWS = "biz/get-biz-reviews"
const GET_USERS_REVIEWS = "biz/get-users-reviews"

const CREATE_REVIEW = "biz/create-review"
const READ_REVIEW = "biz/read-review"
const UPDATE_REVIEW = "biz/update-review"
const DELETE_REVIEW = "biz/delete-review"

// Action Creators

const getBizReviewsAction = payload => {
    return {
        type: GET_BIZ_REVIEWS,
        payload
    }
}

const getUsersReviewsAction = payload => {
    return {
        type: GET_USERS_REVIEWS,
        payload
    }
}

const createReviewAction = payload => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}

const readReviewAction = payload => {
    return {
        type: READ_REVIEW,
        payload
    }
}

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

// Thunk Action Creators

// Reducer

const intitialState = {}

const reviewsReducer = (state = intitialState, action) => {
    let newState = {...state};
    switch (action.type) {
        default: {
            return state
        }
    }
}

export default reviewsReducer
