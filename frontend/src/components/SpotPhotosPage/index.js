import { useParams, useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSingleSpot } from "../../store/spotReducer";
import { addSpotImage } from "../../store/spotReducer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import DeletePhotoModal from "../DeletePhotoModal";
import BadImage from "../../images/badpic.svg"
import "./SpotPhotosPage.css"

export default function SpotPhotosPage() {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(+(params.spotId));
    const [loaded, setLoaded] = useState(false)
    const [previewFile, setPreviewFile] = useState(null)
    const [additionalImages, setAdditionalImages] = useState([]);
    const [additionalImagesErr, setAdditionalImagesErr] = useState()

    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {

            const spotExists = await dispatch(fetchSingleSpot(spotId))
                .catch(() => false)

            if (spotExists) {
                setLoaded(true)
            } else {
                history.push("/pagenotfound")
            }
        })()

    }, [dispatch, spotId]);

    // not logged in
    if (!user) {
        return <Redirect to="/" />
    }

    // spot not loaded
    if (!loaded) {
        return <LoadingIcon />
    }

    // user does not own this spot
    if (user.id !== spot.ownerId) {
        return <Redirect to="/" />
    }

    let spotImages = { ...spot.SpotImages };

    let previewImage
    for (const img of Object.values(spotImages)) {
        if (img.preview) {
            previewImage = img
            break
        }
    }

    if (previewImage) {
        delete spotImages[previewImage.id]
    }

    spotImages = Object.values(spotImages)

    const updatePreviewFile = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewFile(file);
        else setPreviewFile(null)
    };

    const updateAdditionalFiles = (e) => {
        const files = e.target.files;
        console.log("total count additional files", files.length + spotImages.length)
        if (files.length + spotImages.length > 4) {
            setAdditionalImagesErr("You cannot have more than 4 additional images")
            return
        }
        else {
            const files = e.target.files;
            setAdditionalImages(files);
            setAdditionalImagesErr(undefined)
        }
    };

    function onSubmit(e) {
        e.preventDefault()
        if (previewFile) {
            dispatch(addSpotImage(spot.id, previewFile, true))
        }

        if (!additionalImagesErr && additionalImages.length > 0) {

            for (let i = 0; i < additionalImages.length; i++) {
                dispatch(addSpotImage(spot.id, additionalImages[i], false))
            }
        }

        setPreviewFile(null)
        setAdditionalImages([])
    }

    return (
        <div
            className="centering-container"
        >
            <div id="user-reviews-header-container">
                <h1 id="user-reviews-header">
                    Update photos for
                    <Link
                        to={`/spots/${spot.id}`}
                        className="link-to-spot"
                    >
                        <span>{` ${spot.name}`}</span>
                    </Link>
                </h1>
            </div>
            <div
                id="spot-pictures-container"
                className="no-padding"
            >
                <div id="single-picture-container">
                    <div id="picture-container-div">
                        <div
                            className="picture-delete"
                        >
                            <img
                                src={previewImage ? previewImage.url : BadImage}
                                onError={(e) => {
                                    e.target.className = "bad-image"
                                    e.target.src = BadImage;
                                }}
                                className={previewImage ? "single-picture-container" : "bad-image"}

                            />
                            {previewImage &&
                                <DeletePhotoModal
                                    spotImage={previewImage}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="image-columns">
                    <div className="image-rows">
                        <div className="row-image top-row-image">
                            <div
                                className="picture-delete"
                            >
                                <img
                                    src={spotImages[0] ? spotImages[0].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[0] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[0] &&
                                    <DeletePhotoModal
                                        spotImage={spotImages[0]}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row-image">
                            <div
                                className="picture-delete"
                            >
                                <img
                                    src={spotImages[2] ? spotImages[2].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[2] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[2] &&
                                    <DeletePhotoModal
                                        spotImage={spotImages[2]}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-columns">
                    <div className="image-rows">
                        <div className="row-image top-row-image top-right">
                            <div
                                className="picture-delete"
                            >
                                <img
                                    src={spotImages[1] ? spotImages[1].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[1] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[1] &&
                                    <DeletePhotoModal
                                        spotImage={spotImages[1]}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row-image bottom-right">
                            <div
                                className="picture-delete"
                            >
                                <img
                                    src={spotImages[3] ? spotImages[3].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[3] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[3] &&
                                    <DeletePhotoModal
                                        spotImage={spotImages[3]}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form
                className="photo-form"
                onSubmit={onSubmit}
            >
                <div
                    className="photo-form-container"
                >
                    <div
                        className="photo-form-input"
                    >
                        {!previewImage ?
                            <div
                                className="spot-input-container image-input"
                            >
                                <label>
                                    Preview Image
                                </label>
                                <input
                                    type="file"
                                    onChange={updatePreviewFile}
                                />
                            </div> :
                            <div
                                className="image-input"
                            >
                                Delete preview image to add another
                            </div>
                        }
                    </div>
                    <div
                        className="photo-form-input"
                    >
                        {spotImages.length < 4 ?
                            <div
                                className="spot-input-container image-input"
                            >
                                <label
                                    className={additionalImagesErr ? 'error' : ''}
                                >
                                    {additionalImagesErr ? `${additionalImagesErr}` : 'Additional Images'}
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={updateAdditionalFiles}
                                />
                            </div> :
                            <div
                                className="image-input"

                            >
                                Delete an additional image to add another
                            </div>
                        }
                    </div>
                </div>
                {(!previewImage || spotImages.length < 4) && (
                    <div
                        className="spot-photos-submit"
                    >
                        <button
                            className="spot-owner-buttons spot-photos-submit-button"
                        >
                            Add photos
                        </button>
                    </div>
                )}
            </form>
        </div>

    )
}