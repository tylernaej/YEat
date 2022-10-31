import React from "react"
import "./BusinessImages.css"

function BusinessImages({ business }) {
    const images = business.images

    return (
        <>
            {images.map((image, index) => (
                <img
                    src={image.url}
                    // onClick={() => openImageViewer(index)}
                    width="300"
                    key={index}
                    style={{ margin: '2px' }}
                    alt=""
                />
            ))}
        </>
    )
}

export default BusinessImages
