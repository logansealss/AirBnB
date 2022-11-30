import { useState, useEffect } from "react";

import UpdateSpotModal from "../UpdateSpotModal";
import DeleteModal from "../DeleteModal";
import CreateReviewFormModal from "../CreateReviewFormModal";
import dots from "../../images/dots.svg"

import "./UpdateDropdown.css"

export default function OwnerDropdown({ spot, review }) {

    const [menuOpen, toggleMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;

        const closeMenu = () => {
            toggleMenuOpen(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [menuOpen]);

    const popupMenuClass = menuOpen ? "dropdown-menu popup-menu-visible" : "dropdown-menu popup-menu-hidden"

    return (
        <div
            className="update-dropdown-container"
        >
            <div>
                <div
                    className="update-dropdown-button"
                    onClick={() => toggleMenuOpen(!menuOpen)}
                >
                    <img
                        src={dots}
                    />
                </div>
                <div
                    className={popupMenuClass}
                    id="popup"
                >{spot && (
                    <>
                        <UpdateSpotModal
                            className={'popup-menu-option'}
                            spot={spot}
                            isDiv={true}
                        />
                        <DeleteModal
                            className={'popup-menu-option'}
                            spot={spot}
                            isDiv={true}
                        />
                    </>
                )}
                    {review && (
                        <>
                            <CreateReviewFormModal
                                className={'popup-menu-option'}
                                isDiv={true}
                                review={review}
                            />
                            <DeleteModal
                                className={'popup-menu-option'}
                                isDiv={true}
                                review={review}
                            />
                        </>
                    )}
                </div>
            </div>
        </div >
    )

}