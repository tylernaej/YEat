// Action Types

const GET_BIZ = "biz/get-all-biz"
const GET_USERS_BIZ = "biz/get-user-biz"

const CREATE_BIZ = "biz/create-biz"
const READ_BIZ = "biz/read-biz"
const UPDATE_BIZ = "biz/update-biz"
const DELETE_BIZ = "biz/delete-biz"

const BIZ_IMAGES = 'biz/get-images'

// Action Creators

const getBizAction = payload => {
    return {
        type: GET_BIZ,
        payload
    }
}

const getUsersBizAction = payload => {
    return {
        type: GET_USERS_BIZ,
        payload
    }
}

const createBizAction = payload => {
    return {
        type: CREATE_BIZ,
        payload
    }
}

const readBizAction = payload => {
    return {
        type: READ_BIZ,
        payload
    }
}

const updateBizAction = payload => {
    return {
        type: UPDATE_BIZ,
        payload
    }
}

const deleteBizAction = payload => {
    return {
        type: DELETE_BIZ,
        payload
    }
}

const getBizImagesAction = payload => {
    return {
        type: BIZ_IMAGES,
        payload
    }
}

// Thunk Action Creators

export const getBizThunk = (params) => async dispatch => {
    const query = new URLSearchParams(params)
    const response = await fetch(`/api/businesses/?${query.toString()}`)
    const data = await response.json()

    if (response.ok) {
        await dispatch(getBizAction(data))
    }

    return data
}

export const getUsersBizThunk = () => async dispatch => {
    const response = await fetch('/api/businesses/current')
    const data = await response.json()

    if(response.ok){
        await dispatch(getUsersBizAction(data))
    }

    return data
}

export const createBizThunk = (payload) => async dispatch => {
    const response = await fetch(
        '/api/businesses',
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(createBizAction(data))
    }

    return data
}

export const readBizThunk = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}`)
    const data = await response.json()

    if (response.ok) {
        await dispatch(readBizAction(data))
    }

    return data
}

export const updateBizThunk = ({businessId, business}) => async dispatch => {
    const response = await fetch(
        `/api/businesses/${businessId}`,
        {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(business)
        }
    )
    const data = await response.json()

    if (response.ok) {
        await dispatch(updateBizAction(data))
    }

    return data
}

export const deleteBizThunk = (businessId) => async dispatch => {
    // console.log(`The business Id in the Thunk is: ${businessId}`)
    const response = await fetch(
        `/api/businesses/${businessId}`,
        {
            method: "DELETE"
        }
    )

    const data = await response.json()

    if(response.ok){
        await dispatch(deleteBizAction(businessId))
    }

    return data
}

export const getBizImagesThunk = (businessId) => async dispatch => {
    const response = await fetch(
        `/api/businesses/${businessId}/images`,
    )

    const data = await response.json()

    if(response.ok){
        await dispatch(getBizImagesAction({data, businessId}))
    }

    return data
}

// Reducer

const intitialState = {}

const businessReducer = (state = intitialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case (GET_BIZ): {
            action.payload.businesses.forEach(business => {
                newState[business.id] = { ...newState[business.id], ...business }
            })
            return newState
        }
        case (GET_USERS_BIZ): {
            action.payload.businesses.forEach(business => {
                newState[business.id] = { ...newState[business.id], ...business }
            })
            return newState
        }
        case (CREATE_BIZ): {
            newState[action.payload.id] = action.payload
            return newState
        }
        case (READ_BIZ): {
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
            return newState
        }
        case (UPDATE_BIZ): {
            newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
            return newState
        }
        case (DELETE_BIZ): {
            delete newState[action.payload]
            return newState
        }
        case (BIZ_IMAGES): {
            newState[action.payload.businessId] = { ...newState[action.payload.businessId], images: action.payload.data.images }
            return newState
        }
        default: {
            return state
        }
    }
}

export default businessReducer
