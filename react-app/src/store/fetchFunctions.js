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
    const response = await fetch(`api/businesses/${id}/amenities`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(amenityPayload)
    })
    const data = await response.json()
    console.log(`The data returned is: ${Object.keys(data)}`)
    return data
}
