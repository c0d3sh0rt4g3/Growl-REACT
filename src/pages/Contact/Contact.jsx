import React, {useState} from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import CustomAlert from "../components/CustomAlert.jsx";
import {validateEmailRegex} from "../../helpers/validateEmail.js";

const Contact = () => {
    // useState to store parameters to show an alert using CustomAlert component
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    // Validation using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name should be at least 3 characters long")
            .required("Name is required"),
        surname: Yup.string()
            .min(3, "Surname should be at least 3 characters long")
            .required("Surname is required"),
        email: Yup.string()
            .matches(validateEmailRegex, "The email address introduced isn't valid")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^(\+34)?\d{9}$/, "Phone number is invalid")
            .required("Phone number is required"),
        message: Yup.string()
            .min(3, "Message should be at least 3 characters long")
            .required("Message is required")
    })

    // Handle form submission
    const handleSubmit = ({ resetForm }) => {
        setAlert({
            show: true,
            message: "Contact data sent successfully!",
            type: "success"
        })
        resetForm()
    }

    return (
        <main id="account-form-container">
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    message: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form id="account-form" onSubmit={handleSubmit}>
                    <h2>Contact Us:</h2>

                    <input
                        type="text"
                        className="form-textbox"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                        <p className="error-message">{errors.name}</p>
                    )}

                    <input
                        type="text"
                        className="form-textbox"
                        id="surname"
                        name="surname"
                        placeholder="Surname"
                        value={values.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.surname && touched.surname && (
                        <p className="error-message">{errors.surname}</p>
                    )}

                    <input
                        type="email"
                        className="form-textbox"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                        <p className="error-message">{errors.email}</p>
                    )}

                    <input
                        type="text"
                        className="form-textbox"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.phone && touched.phone && (
                        <p className="error-message">{errors.phone}</p>
                    )}

                    <textarea
                        className="form-textbox"
                        id="message"
                        name="message"
                        placeholder="Write us"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        cols="50"
                    />
                    {errors.message && touched.message && (
                        <p className="error-message">{errors.message}</p>
                    )}

                    <button id="send-contact-data-btn" type="submit" disabled={isSubmitting}>
                    Send
                    </button>
                </form>
            )}
            </Formik>
            {alert.show && (
                <CustomAlert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({...alert, show: false})}
                />
            )}
        </main>
    )
}

export default Contact