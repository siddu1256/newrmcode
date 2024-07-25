import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import Axios from "axios";
import bcrypt from "bcryptjs";

function RegisterPop() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const existingUser = await Axios.get(`http://localhost:3000/users?mobilenumber=eq.${mobileNumber}`);
      console.log("Existing user check response:", existingUser.data);

      if (existingUser.data.length > 0) {
        alert("Mobile number already exists!");
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
    } catch (error) {
      console.error("Error registering user:", error.response || error);
      alert("Error registering user.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signin-popup">
        <h1>Register</h1>
        <CiUser className="profileicon" />
        <div className="UserName">
          <p>Full Name</p>
          <input
            type="text"
            className="details"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="UserName">
          <p>Mobile Number</p>
          <input
            type="tel"
            className="details"
            placeholder="Enter your mobile number"
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
