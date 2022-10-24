export const getAmenities = async () => {
    const response = await fetch('/api/amenities/')
    const data = await response.json()

    return data
}

export const getCategories = async () => {
    const response = await fetch('/api/categories/')
    const data = await response.json()



    return data
}

export const postAmenities = ({id, amenityPayload}) => async dispatch => {
    const response = await fetch(`/api/businesses/${id}/amenities`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(amenityPayload)
    })
    const data = await response.json()
    return data
}

export const postCategories = ({id, categoryPayload}) => async dispatch => {
    const response = await fetch(`/api/businesses/${id}/categories`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryPayload)
    })
    const data = await response.json()
    return data
}

export const getReview = async (id) => {
    const response = await fetch(`/api/reviews/${id}`)
    const data = await response.json()

    return data
}


export const awsUpload = async payload => {
    const res = await fetch('/api/images', {
        method: "POST",
        body: payload,
    });
    const data = await res.json();

    if (res.ok) {
        return data
    }
    else {
        console.log(data)
        return {'message': 'Failed to upload image'}
    }
}
