import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { awsUpload } from "../../../../store/fetchFunctions";

function SetBusinessImages() {
    const history = useHistory()
    const location = useLocation()
    const id = Number(location.pathname.split('/')[2])

    // const [image, setImage] = useState('')

    const [awsImages, setAwsImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [images, setImages] = useState([])

    // const [imageLoading, setImageLoading] = useState(false);

    // file reader to display preview images before uploading
    const getPreviewImages = async (uploaded) => {
        const file = uploaded[uploaded.length - 1]
        const reader = new FileReader(file)

        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setPreviewImages([...previewImages, reader.result])
            }
        }

        // reader.readAsDataURL(file);
        // reader.onloadend = function () {
        //     setPreviewImages([...previewImages, reader.result])
        // }
    }

    // function to remove a file that the user does not want to upload
    const removePreviewImage = (imageToRemove, idx) => {
        const newPreviewImages = [...previewImages]
        newPreviewImages.splice(idx, 1)

        const newImages = [...images]
        newImages.splice(idx, 1)

        setPreviewImages(newPreviewImages)
        setImages(newImages)
    }

    const updateImages = async (files) => {
        const uploaded = [...images]
        // console.log('FILES', files)
        const length = uploaded.length
        const file = files[files.length - 1]
        // console.log(file)
        const item = uploaded.find(uploadedFile => uploadedFile?.name === file?.name)
        if (item) {
            files.pop()
        } else {
            uploaded.push(file)
        }
        setImages(uploaded)
        console.log(images)

        if (uploaded.length !== length) {
            getPreviewImages(uploaded)
        }
    }

    const handleFileEvent = (e) => {
        // if (!e.target.files) return
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        if (chosenFiles.length > 0) updateImages(chosenFiles)

    }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    const uploadSingleImageToAWS = async image => {
        const imgData = new FormData();
        imgData.append("image", image)

        let awsData = await awsUpload(imgData)

        setAwsImages([...awsImages, awsData])

        if (!awsData.url) return

        const data = await fetch(
            `/api/businesses/${id}/images`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(awsData)
            }
        )

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        images.forEach(async image => await uploadSingleImageToAWS(image))

        history.push(`/create-business/${id}/amenities`)
    }



    return (
        <div>
            <div>
                <div className="preview-images-container">
                    {previewImages.length > 0 && previewImages.map((image, i) => (
                        <div key={i} className="current-preview-image">
                            <img className="preview image" src={image} />
                            {/* <img onClick={(e) => removePreviewImage(image, i)} className='remove-preivew-img icon' src={exit} alt="" /> */}

                            <ion-icon onClick={(e) => removePreviewImage(image, i)} name="close-circle"></ion-icon>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    {/* <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <div onClick={handleSubmit}>
                        Add Image
                    </div> */}

                    <input
                        type="file"
                        className="file-select create-spot"
                        accept=".png,
                            .jpeg,
                            .jpg,"
                        onChange={handleFileEvent}
                    />
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default SetBusinessImages
