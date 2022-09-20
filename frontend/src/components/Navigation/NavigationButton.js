import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function NavigationButton() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [menuOpen, toggleMenuOpen] = useState(false);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!menuOpen) return;
    
        const closeMenu = () => {
          toggleMenuOpen(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
      }, [menuOpen]);

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
                        <LoginFormModal afterSubmission={removeMenu} className="popup-menu-option"/>
                        <SignupFormModal afterSubmission={removeMenu} className="popup-menu-option" />
                    </>
                )
            }
        </div>
    </div>
        </div >
    )

}
export default NavigationButton;