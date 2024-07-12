import "../style/components/Header.css";

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function Header({ showBackButton, showCircleButton, nav }) {
    const [isDropdownShown, setIsDropdownShown] = useState(false)
    const [userImage, setUserImage] = useState(null)

    // useEffect(() => {
    //     const 
    // })


    const toggleDropdown = () => {
        setIsDropdownShown(prevState => !prevState)
    }

    return (
        <div className="Header">
            <div className="Header-button-box">
                {showBackButton && (
                    <button className="Back-button" onClick={() => nav(-1)}>&lt;</button>
                )}
            </div>
            <div className="Header-title">아무 말 대잔치</div>
            <div className="Header-button-box">
                {showCircleButton && (
                    <button className="Circle-button" onClick={toggleDropdown}></button>
                )}
                {isDropdownShown && <Dropdown />}
            </div>
        </div>
    );
}

export default Header;
