import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

function SearchBar({ onSearch }) {
    

    return (
        <div className="search-bar">
            <div className="search-container">
               
                <input
                    type="text"
                    placeholder="Search for products..."
                    className='searchbarinput'
                />
                <IoSearchOutline  className="search-icon" />
            </div>
        </div>
    );
}

export default SearchBar;
