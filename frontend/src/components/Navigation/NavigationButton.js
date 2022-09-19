import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";

function NavigationButton() {
    const dispatch = useDispatch();
    const [menuOpen, toggleMenuOpen] = useState(false);
    const user = useSelector(state => state.session.user);

    const logout = () => {
        dispatch(sessionActions.logout());
        toggleMenuOpen(false);
    };

    function removeMenu() {
        toggleMenuOpen(false);
    }

    const popupMenuClass = menuOpen ? "popup-menu popup-menu-visible" : "popup-menu popup-menu-hidden"

    return (
        <div
            className="menu-button-container"
            onBlur={() => {
                toggleMenuOpen(false)
                console.log("onLBur for menu")
            }}
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
                >
                    {user ? (
                        <>
                            <div
                                className="popup-menu-option"
                                onClick={logout}
                            >Log Out
                            </div>
                        </>
                    )
                        : (
                            <>
                                <div className="popup-menu-option">
                                    <LoginFormModal afterSubmission={removeMenu} />
                                </div>
                                <div className="popup-menu-option">Sign Up</div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )

}
export default NavigationButton;