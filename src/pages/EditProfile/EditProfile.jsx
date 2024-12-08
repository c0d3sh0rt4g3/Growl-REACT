import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import "../../css/edit-account.css"

// Import health and diet options
import { healthOptionsList, dietOptionsList } from "../../helpers/healthAndDietOptions.js";

// Helper function to find user in usersDB by ID
const findUserIndexById = (users, userId) => {
  return users.findIndex(user => user.id === userId);
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));
  const usersFromDB = JSON.parse(localStorage.getItem('usersDB'));

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: user.username || '',
      pfpUrl: user.pfpUrl || '',  // Profile picture URL
      tags: user.tags || [], // tags come from health and diet options
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
    }),
    onSubmit: (values) => {
      // Create an updated user object with the new values
      const updatedUser = { ...user, ...values };

      // Update usersDB in localStorage
      const userIndex = findUserIndexById(usersFromDB, user.id);
      if (userIndex !== -1) {
        usersFromDB[userIndex] = updatedUser;
        localStorage.setItem('usersDB', JSON.stringify(usersFromDB));
      }

      // Update currentUser in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Navigate to the profile page after saving
      navigate('/profile');
    }
  });

  // Handle checkbox change for tags
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const tags = formik.values.tags;

    if (checked) {
      // Add tag to selected tags
      formik.setFieldValue('tags', [...tags, name]);
    } else {
      // Remove tag from selected tags
      formik.setFieldValue('tags', tags.filter(tag => tag !== name));
    }
  };

  useEffect(() => {
    // Set the initial form data from currentUser when it changes
    setUser(JSON.parse(localStorage.getItem('currentUser')));
  }, [formik.values]);

  return (
      <main id={"edit-account-container"}>
        <div id="edit-account-fields-container">
          <h1 id="edit-account-h1">Edit Account</h1>
          <input
            type="text"
            className="account-details-textbox"
            placeholder="Username"
            aria-label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
          />
          {formik.errors.username && formik.touched.username ? <div>{formik.errors.username}</div> : null}
          <input
            type="text"
            className="account-details-textbox"
            placeholder="Profile Picture URL"
            aria-label="Profile Picture"
            value={formik.values.pfpUrl}
            onChange={formik.handleChange}
            name="pfpUrl"
          />
          <div className="tags-section">
            <h2>Health Tags</h2>
            <div className="tags-options">
              {healthOptionsList.map((option) => (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    name={option.value}
                    checked={formik.values.tags.includes(option.value)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Diet Tags (Checkboxes) */}
          <div className="tags-section">
            <h2>Diet Tags</h2>
            <div className="tags-options">
              {dietOptionsList.map((option) => (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    name={option.value}
                    checked={formik.values.tags.includes(option.value)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            id="confirm-changes-btn"
            onClick={formik.handleSubmit}
          >
            Confirm Changes
          </button>
        </div>
      </main>
  );
};

export default EditProfile;
