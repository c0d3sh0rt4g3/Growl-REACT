import React, {useContext, useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {validateEmailRegex} from "../../helpers/validateEmail.js";
import {NavLink, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";
import {signIn} from "../../config/Firebase.jsx";
import CustomAlert from "../components/CustomAlert.jsx";

const SignIn = () => {
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    const usersFromDB = JSON.parse(localStorage.getItem("usersDB"))

    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) navigate("/search")
    }, [user, navigate])

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(validateEmailRegex, "The email address introduced isn't valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "The password should have at least 6 characters")
            .required("Password is required")
    })

    const findUsernameByEmail = (email) => {
        for (let i = 0; i < usersFromDB.length; i++) {
            if (usersFromDB[i].email === email) {
                return usersFromDB[i].username
            }
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signIn(values.email, values.password)
            setAlert({
                show: true,
                message: `User registered with email: ${values.email}`,
                type: "success"
            })
            const usernameFromDB = findUsernameByEmail(values.email)

            const newUser = {
                email: values.email,
                username: usernameFromDB,
                tags: []
            }

            localStorage.setItem("currentUser", JSON.stringify(newUser))
        } catch (error) {
            let errorMsg = `Error ${error.code}:\n ${error.message}`
            if (error.code === "auth/invalid-credential") {
                errorMsg = "Incorrect email or password"
            }
            setAlert({
                show: true,
                message: errorMsg,
                type: "error"
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main id={"account-form-container"}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={true}
                validateOnChange={false}
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
                    <form id={"account-form"} onSubmit={handleSubmit}>
                        <h2>Sign in</h2>
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
                        <p>Forgot your password? Click here!</p>

                        <button type="submit" id="form-signin-btn" disabled={isSubmitting}>
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
    );
};

export default SignIn;