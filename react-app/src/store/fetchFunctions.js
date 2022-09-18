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
