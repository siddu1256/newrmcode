import React, { useState } from "react";
import SigninPop from "./signinpopup";

function ProfileDropDown({ handleSigninClick, handleRegisterClick }) {
  return (
    <div className="dropdown profile-drop-down">
      <div>
        <p className="dropdown-item">
          <button className="buttons" onClick={handleSigninClick}>
            Sign in
          </button>
        </p>
        <p className="dropdown-item">
          <button className="buttons" onClick={handleRegisterClick}>
            Register
          </button>
        </p>
        <p className="dropdown-item">Settings</p>
      </div>
    </div>
  );
}
export default ProfileDropDown;
