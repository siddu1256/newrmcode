import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Axios from "axios";
import bcrypt from "bcryptjs";

function RegisterPop({ onClose }) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !mobileNumber || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (mobileNumber.length != 10){
      alert("Mobile number should be 10 digits");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const existingUserByMobile = await Axios.get(`http://localhost:3000/users?mobilenumber=eq.${mobileNumber}`);
      if (existingUserByMobile.data.length > 0) {
        alert("Mobile number already exists!");
        return;
      }

      const existingUserByUsername = await Axios.get(`http://localhost:3000/users?fullname=eq.${fullName}`);
      if (existingUserByUsername.data.length > 0) {
        alert("Username already exists!");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        fullname: fullName,
        mobilenumber: mobileNumber,
        userpassword: hashedPassword
      };

      const response = await Axios.post("http://localhost:3000/users", userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Registration response:", response.data);
      alert("User registered successfully!");
      onClose();
    } catch (error) {
      console.error("Error registering user:", error.response || error);
      alert("Error registering user.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signin-popup">
        <div className="close-button" onClick={onClose}><IoMdClose /></div>
        <h1>Register</h1>
        <CiUser className="profileicon" />
        <div className="UserName">
          <p>Username</p>
          <input
            type="text"
            className="details"
            placeholder="Enter username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="UserName">
          <p>Mobile Number</p>
          <input
            type="tel"
            className="details"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="Password">
          <p>Password</p>
          <input
            type="password"
            className="details"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="Password">
          <p>Confirm Password</p>
          <input
            type="password"
            className="details"
            placeholder="Enter the same password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="close" onClick={handleRegister}>
          Create
        </button>
      </div>
    </div>
  );
}

export default RegisterPop;
