import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Logo from "./logo";
import ProfileLogo from "./profilelogo";
import HeartLogo from "./heartlogo";
import SupportDropDown from "./onpresssupport";
import ProfileDropDown from "./onpressprofile";
import RegisterPop from "./regpopup";
import SigninPop from "./signinpopup";

function SearchBar({ onSearch }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

  const [showSignin, setShowSignin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    console.log("Register button clicked");
    setShowRegister(true);
  }

  const handleSigninClick = () => {
    console.log("Sign in button clicked");
    setShowSignin(true);
  };

  const handleClose = () => {
    setShowSignin(false);
    setShowRegister(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isSupportDropdownOpen) {
      setIsSupportDropdownOpen(false);
    }
  };

  const toggleSupportDropdown = () => {
    setIsSupportDropdownOpen(!isSupportDropdownOpen);
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="topBARleft">
        <Logo />
      </div>
      <div className="search-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="searchbarinput"
          />
          <IoSearchOutline className="search-icon" />
        </div>
      </div>
      <div className="topBARright">
        <HeartLogo />
        <div className="support-container" onClick={toggleSupportDropdown}>
          <button className="support">Support</button>
          {isSupportDropdownOpen && <SupportDropDown />}
        </div>
        <div onClick={toggleProfileDropdown} className="profile-logo-container">
          <ProfileLogo />
          {isProfileDropdownOpen && (
            <ProfileDropDown handleSigninClick={handleSigninClick} handleRegisterClick={handleRegisterClick} />
          )}
        </div>
      </div>
      {showSignin && <SigninPop onClose={handleClose} />}
      {showRegister && <RegisterPop onClose={handleClose}/>}
    </div>
  );
}

export default SearchBar;
