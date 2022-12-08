import { useParams, useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleSpot } from "../../store/spotReducer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import DeletePhotoModal from "../DeletePhotoModal";
import BadImage from "../../images/badpic.svg"
import TrashCan from "../../images/trashcan.svg"
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
    };

    const updateAdditionalFiles = (e) => {
        const files = e.target.files;
        if (files.length + spotImages.length > 4) {
            setAdditionalImagesErr("You cannot have more than 4 additional images")
            return
        }
        setAdditionalImages(files);
    };

    return (
        <div
            className="centering-container"
        >
            <div id="user-reviews-header-container">
                <h1 id="user-reviews-header">
                    Update photos for {spot.name}
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
                                onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                className={previewImage ? "single-picture-container" : "bad-image"}
                            />
                            {previewImage &&
                                // <div
                                //     className="delete-photo-button"
                                // >
                                //     <img
                                //         src={TrashCan}
                                //     />
                                // </div>
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
                                    <div
                                        className="delete-photo-button"
                                    >
                                        <img
                                            src={TrashCan}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row-image">
                            <div
                                className="picture-delete"
                            >
                                <img
                                    src={spotImages[1] ? spotImages[1].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[1] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[1] &&
                                    <div
                                        className="delete-photo-button"
                                    >
                                        <img
                                            src={TrashCan}
                                        />
                                    </div>
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
                                    src={spotImages[2] ? spotImages[2].url : BadImage}
                                    onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                    className={spotImages[2] ? "smaller-images" : "bad-image"}
                                />
                                {spotImages[2] &&
                                    <div
                                        className="delete-photo-button"
                                    >
                                        <img
                                            src={TrashCan}
                                        />
                                    </div>
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
                                    <div
                                        className="delete-photo-button"
                                    >
                                        <img
                                            src={TrashCan}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form
                className="photo-form"
            >
                <div
                    className="photo-form-container"
                >
                    <div
                        className="photo-form-input"
                    >
                        {!previewImage ?
                            <div
                                className="spot-input-container preview-image-input"
                            >
                                <label>
                                    Preview Image
                                </label>
                                <input
                                    type="file"
                                    onChange={updatePreviewFile}
                                />
                            </div> :
                            <div>
                                Delete preview image to add another
                            </div>
                        }
                    </div>
                    <div
                        className="photo-form-input"
                    >
                        {spotImages.length < 4 ?
                            <div
                                className="spot-input-container preview-image-input"
                            >
                                <label>
                                    Additional Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={updateAdditionalFiles}
                                />
                            </div> :
                            <div>
                                Delete an additional image to add another
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>

    )
}