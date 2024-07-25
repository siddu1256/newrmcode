import React, { useState } from "react";
import SigninPop from "./signinpopup";

function ProfileDropDown() {
    const [showSignin, setShowSignin] = useState(false);

    const handleSigninClick = () => {
        console.log("Sign in button clicked");
        setShowSignin(true);
    };

    const handleClose = () => {
        setShowSignin(false);
    };

    return (
        <div>
            <div className="dropdown">
                <p className="dropdown-item">
                    <button className="buttons" onClick={handleSigninClick}>Sign in</button>
                </p>
                <p className="dropdown-item">Register</p>
                <p className="dropdown-item">Settings</p>
            </div>
            {showSignin && (
                <SigninPop onClose={handleClose} />
            )}
        </div>
    );
}
export default ProfileDropDown;
