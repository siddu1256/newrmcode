import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import Axios from "axios";
import bcrypt from "bcryptjs";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { IoMdClose } from "react-icons/io";

function SigninPop({ onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/users?fullname=eq.${username}`);
            const user = response.data[0]; 

            if (user) {
                const isMatch = await bcrypt.compare(password, user.userpassword);

                if (isMatch) {
                    alert("Sign in successful!");
                    onClose();
                } else {
                    alert("Invalid password.");
                }
            } else {
                alert("User not found.");
            }
        } catch (error) {
            console.error("Error signing in:", error.response || error);
            alert("Error signing in.");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse?.credential);
            const email = encodeURIComponent(decoded.email);
            const name = decoded.name;

            console.log("Decoded token:", decoded);
            try {
                const response = await Axios.get(`http://localhost:3000/google_users?email=eq.${email}`);
                const user = response.data[0];

                if (user) {
                    alert("Google login successful!");
                    onClose();
                } else {
                    const googleuserData = {
                        email: decoded.email,
                        name: name
                    };
                    const newUserResponse = await Axios.post('http://localhost:3000/google_users', googleuserData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log("New user response:", newUserResponse);
                    alert("New Google user created and logged in successfully!");
                    onClose();
                }
            } catch (getError) {
                if (getError.response && getError.response.status === 404) {
                    const googleuserData = {
                        email: decoded.email,
                        name: name
                    };
                    const newUserResponse = await Axios.post('http://localhost:3000/google_users', googleuserData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log("New user response:", newUserResponse);
                    alert("New Google user created and logged in successfully!");
                    onClose();
                } else {
                    console.error("Error during GET request:", getError.response || getError);
                    alert("Error checking Google user.");
                }
            }
        } catch (error) {
            console.error("Error during Google sign in:", error.response || error);
            alert("Error during Google sign in.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="signin-popup">
                <div className="close-button" onClick={onClose}><IoMdClose /></div>
                <h1>Sign In</h1>
                <CiUser className="profileicon" />
                <div className="UserName">
                    <p>Username</p>
                    <input
                        type="text"
                        className="details"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="Password">
                    <p>Password</p>
                    <input
                        type="password"
                        className="details"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="forgotpass">Forgot Password?</button>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                <button className="close" onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
}

export default SigninPop;


