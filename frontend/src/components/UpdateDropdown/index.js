import { useState, useEffect, useRef } from "react";

import UpdateSpotModal from "../UpdateSpotModal";
import DeleteModal from "../DeleteModal";
import CreateReviewFormModal from "../CreateReviewFormModal";
import dots from "../../images/dots.svg"

import "./UpdateDropdown.css"

export default function OwnerDropdown({ spot, review }) {

    const [menuOpen, toggleMenuOpen] = useState(false);
    const ref = useRef()

    function closeMenu(){
        toggleMenuOpen(false);
    }

    useEffect(() => {
        if (!menuOpen) return;

        const closeMenu = (e) => {

            if (ref.current && !ref.current.contains(e.target) && ref.current !== e.target) {
                toggleMenuOpen(cur => !cur);
            }
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
                    ref={ref}
                >{spot && (
                    <>
                        <UpdateSpotModal
                            className={'popup-menu-option'}
                            spot={spot}
                            isDiv={true}
                            whenClicked={closeMenu}
                        />
                        <DeleteModal
                            className={'popup-menu-option'}
                            spot={spot}
                            isDiv={true}
                            whenClicked={closeMenu}
                        />
                    </>
                )}
                    {review && (
                        <>
                            <CreateReviewFormModal
                                className={'popup-menu-option'}
                                isDiv={true}
                                review={review}
                                whenClicked={closeMenu}
                            />
                            <DeleteModal
                                className={'popup-menu-option'}
                                isDiv={true}
                                review={review}
                                whenClicked={closeMenu}
                            />
                        </>
                    )}
                </div>
            </div>
        </div >
    )

}