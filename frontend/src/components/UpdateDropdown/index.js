import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import UpdateSpotModal from "../UpdateSpotModal";
import DeleteModal from "../DeleteModal";

import CreateReviewFormModal from "../CreateReviewFormModal";

export default function OwnerDropdown({ spot, review }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [menuOpen, toggleMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;

        const closeMenu = () => {
            toggleMenuOpen(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [menuOpen]);

    function removeMenu() {
        toggleMenuOpen(false);
    }

    const popupMenuClass = menuOpen ? "popup-menu popup-menu-visible" : "popup-menu popup-menu-hidden"

    return (
        <div
            className="menu-button-container"
        >
            <div>
                <button
                    className='menu-button'
                    onClick={() => toggleMenuOpen(!menuOpen)}
                >
                    <div className='icon-container'>
                        <i className="fa-solid fa-bars fa-1x"></i>
                        <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                </button>
                <div
                    className={popupMenuClass}
                    id="popup"
                >{spot && (
                    <>
                        <UpdateSpotModal 
                            spot={spot}
                        />
                        <DeleteModal 
                            spot={spot}
                        />
                    </>
                )}
                {review && (
                    <>
                        <CreateReviewFormModal
                            review={review}
                        />
                        <DeleteModal 
                            review={review}
                        />
                    </>
                )}

                    {/* {user ? (
                        <>
                            <div
                                className="popup-menu-option-no-pointer"
                            >
                                {user.username}
                            </div>
                            <div
                                id="bottom-border"
                                className="popup-menu-option-no-pointer"
                            >
                                {user.email}
                            </div>
                            <div
                                className="popup-menu-option"
                                onClick={() => history.push("/myspots")}
                            >
                                My spots
                            </div>
                            <div
                                className="popup-menu-option"
                                onClick={() => history.push("/myreviews")}
                            >
                                My reviews
                            </div>
                            <div
                                className="popup-menu-option"
                                onClick={() => history.push("/createspot")}
                            >
                                Create spot
                            </div>
                            <div
                                className="popup-menu-option"
                                onClick={logout}
                            >Log out
                            </div>
                        </>
                    )
                        : (
                            <>
                                <LoginFormModal afterSubmission={removeMenu} className="popup-menu-option" />
                                <SignupFormModal afterSubmission={removeMenu} className="popup-menu-option" />
                            </>
                        )
                    } */}
                </div>
            </div>
        </div >
    )

}