import React, { useState } from 'react';
import ProfileLogo from './profilelogo';
import HeartLogo from './heartlogo';
import SupportDropDown from './onpresssupport';

function RightSide() {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

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
        <div className='rightSide'>
            <div className='topBARright'>
                <HeartLogo />
                <div className='support-container' onClick={toggleSupportDropdown}>
                    <button className='support'>Support</button>
                    {isSupportDropdownOpen && <SupportDropDown />}
                </div>
                <div onClick={toggleProfileDropdown} className='profile-logo-container'>
                    <ProfileLogo />
                </div>
            </div>
            <p className='aboutcompany'>
                Welcome to ReviewMart, your ultimate destination for smart shopping! Our website allows you to effortlessly search for any product and instantly view comprehensive details, including ratings and reviews, from top e-commerce platforms like Amazon, Flipkart, and more. Whether you're looking for the best deals on electronics, fashion, home appliances, or any other category, CompareIt provides a side-by-side comparison to help you make informed purchasing decisions. Save time, money, and avoid the hassle of browsing multiple sites. Experience seamless shopping with CompareIt, where you can trust that you’re always getting the best value for your money.
            </p>
        </div>
    );
}
export default RightSide;
