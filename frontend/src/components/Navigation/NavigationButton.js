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

    // useEffect(() => {

    //     if (!menuOpen) return;

    //     document.addEventListener('click', removeMenu);

    //     return () => document.removeEventListener("click", removeMenu);

    // }, [menuOpen]);

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
                {menuOpen && (
                    <div
                        className="popup-menu"
                        onBlur={(e) => { 
                            console.log("popup blur happened") 
                            if(e.currentTarget === e.target){
                                console.log("popup blur target !== popup blur current target")
                                removeMenu();
                            }
                            }}
                        onClick={(e) => {console.log("clicked popup-menu")}}
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
                )}
            </div>
        </div>
    )

}
export default NavigationButton;