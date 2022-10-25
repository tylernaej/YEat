import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { awsUploadImage } from "../../../../store/fetchFunctions";

function SetBusinessImages () {
    const location = useLocation()
    const [image, setImage] = useState('')
    const [awsImages, setAwsImages] = useState([])
    const [imageLoading, setImageLoading] = useState(false);
    const id = Number(location.pathname.split('/')[2])

    console.log('image', image)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const imgData = new FormData();
        imgData.append("image", image)
        // imgData.append("businessId", id)
        setImageLoading(true)

        let awsData = await awsUploadImage(imgData)

        if (awsData.url) {
            setImageLoading(false)
        } else {
            setImageLoading(false)
            return
        }

    }

    return (
        <div>
            <div>
                {/* {awsImages && awsImages.map(image => {
                    <div>
                        <img src={`${image.url}`} />
                    </div>
                })} */}
                <form>
                    <input
                        type="file"
                        name="filefield"
                        multiple="multiple"
                        onChange={e => setImage(e.target.value)}
                    />
                    <div onClick={handleSubmit}>
                        Add Image
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetBusinessImages