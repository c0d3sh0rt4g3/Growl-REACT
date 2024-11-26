import React, { useState } from "react"
import "../../css/signin-signup.css"
import CustomAlert from "../components/CustomAlert.jsx"
import { Formik } from "formik"
import * as Yup from "yup"
import {validateEmailRegex} from "../../helpers/validateEmail.js";

const SignUp = () => {
    // useState to store parameters to show an alert using CustomAlert component
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    // Validation using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(validateEmailRegex, "The email address introduced isn't valid")
            .required("Email is required"),
        user: Yup.string()
            .min(3, "The field user should be at least 3 characters long")
            .required("Username is required"),
        password: Yup.string()
            .min(6, "The password should have at least 6 characters")
            .required("Password is required"),
        passwordRepeated: Yup.string()
            .oneOf([Yup.ref("password"), null], "This password doesn't match with the one you introduced above.")
            .required("You must confirm your password"),
        termsAndConditionsAccepted: Yup.boolean()
            .oneOf([true], "You must accept terms and conditions")
    })

    // Handle form submission
    const handleSubmit = ({ setSubmitting }) => {
        setAlert({
            show: true,
            message: "Account created successfully!",
            type: "success"
        })
        setSubmitting(false)
    }

    return (
        <main id="account-form-container">
            <Formik
                initialValues={{
                    email: "",
                    user: "",
                    password: "",
                    passwordRepeated: "",
                    termsAndConditionsAccepted: false,
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
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit} id="account-form">
                <h2>Sign up</h2>
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
                    id="user"
                    name="user"
                    placeholder="Username"
                    value={values.user}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.user && touched.user && (
                    <p className="error-message">{errors.user}</p>
                )}
                <input
                    type="password"
                    className="form-textbox"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                    <p className="error-message">{errors.password}</p>
                )}
                <input
                    type="password"
                    className="form-textbox"
                    id="passwordRepeated"
                    name="passwordRepeated"
                    placeholder="Repeat your password"
                    value={values.passwordRepeated}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.passwordRepeated && touched.passwordRepeated && (
                    <p className="error-message">{errors.passwordRepeated}</p>
                )}
                <div id="checkbox-container">
                    <input
                        id="terms-checkbox"
                        type="checkbox"
                        name="termsAndConditionsAccepted"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.termsAndConditionsAccepted}
                    />
                    <label htmlFor="terms-checkbox">
                        I accept terms and conditions
                    </label>
                </div>
                {errors.termsAndConditionsAccepted && touched.termsAndConditionsAccepted && (
                    <p className="error-message"> {errors.termsAndConditionsAccepted}</p>
                )}
                <button
                    type="submit"
                    id="form-signin-btn"
                    value="Sign in"
                    disabled={isSubmitting}
                >
                Sign up
                </button>
            </form>
        )}
        </Formik>
        {alert.show && (
            <CustomAlert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ ...alert, show: false })}
            />
        )}
        </main>
    )
}

export default SignUp