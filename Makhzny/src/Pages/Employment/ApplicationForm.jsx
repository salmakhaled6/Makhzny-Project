import React, { useState } from "react";
import "../../Styles/Application.css";

function ApplicationForm() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="application-form-container">
      <div className="transfer-request">
        <div className="transfer-request-box">
          <h2>Employment Application Form</h2>
        </div>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <p className="section-title">Personal Information</p>
        <hr />

        <label>Full Name (as in ID)*</label>
        <input type="text" placeholder="Full Name (as in ID)" required />

        <label>Gender *</label>
        <div className="gender-options">
          <label>
            <input type="radio" name="gender" required /> Female
          </label>
          <label>
            <input type="radio" name="gender" required /> Male
          </label>
        </div>

        <label>Phone Number *</label>
        <input type="text" placeholder="Phone Number" required />

        <label>Email Address</label>
        <input type="email" placeholder="Email Address" />

        <p className="section-title">Attachments</p>
        <hr />
        <button type="button" className="upload-btn">
          Upload CV (PDF or Word) *
        </button>

        <p className="section-title">Additional Questions</p>
        <hr />
        <label>Why are you the ideal candidate for this position? *</label>
        <textarea rows="4" placeholder="Your answer..." required></textarea>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" required /> I declare that all information
            provided is true and complete *
          </label>
          <label>
            <input type="checkbox" required /> I agree to the privacy policy and
            employment terms *
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Your application has been submitted successfully!</p>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;
