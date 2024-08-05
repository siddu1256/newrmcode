import React, { useState } from "react";
import Axios from "axios";
import "./Aboutpage.css";

function Aboutpage() {
  const [complaint, setComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state

  const handleComplaintSubmit = async () => {
    if (!complaint) {
      alert("Please enter your complaint.");
      return;
    }

    setIsSubmitting(true);

    try {
      const complaintData = {
        complaint: complaint
      };

      const response = await Axios.post("http://localhost:3000/complaints", complaintData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Complaint submission response:", response.data);
      alert("Complaint submitted successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting complaint:", error.response || error);
      alert("Error submitting complaint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="aboutpagecss">
      <div className="infodiv">
        <div className="content-div">
          <h2>DEVELOPER 1</h2>
          <img src="path/to/developer1.jpg" alt="Developer 1" className="developer-image" />
          <p>Developer 1 is a skilled software engineer with expertise in front-end development...</p>
        </div>
        <div className="content-div">
          <h2>DEVELOPER 2</h2>
          <img src="path/to/developer2.jpg" alt="Developer 2" className="developer-image" />
          <p>Developer 2 has a strong background in back-end development and database management...</p>
        </div>
        <div className="content-div contact-details">
          <h2>CONTACT DETAILS</h2>
          <p>Phone: 123-456-7890</p>
          <p>Email: developer@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Email: developer2@example.com</p>
          <h2>Complaints:</h2>
          <textarea
            className="complaint-box"
            placeholder="Enter your complaint here..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
          <button
            className={`fancybutton ${isSubmitted ? 'disabled' : ''}`}
            onClick={handleComplaintSubmit}
            disabled={isSubmitting}
          >
            {isSubmitted ? (
              <>
                <span className="tick">✔</span>
                Complaint Submitted
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
