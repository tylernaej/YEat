import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { awsUpload } from "../../../../store/fetchFunctions";

function SetBusinessImages() {
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

        setImageLoading(true)

        let awsData = await awsUpload(imgData)

        if (awsData.url) {
            setImageLoading(false)
            console.log(awsData.url)
        } else {
            setImageLoading(false)
            console.log(awsData)
            return
        }

        const data = await fetch(
            `/api/businesses/${id}/images`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(awsData)
            }
        )

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
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
                        accept="image/*"
                        onChange={updateImage}
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
