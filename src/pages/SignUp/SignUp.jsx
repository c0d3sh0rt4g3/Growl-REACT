import React, {useState} from 'react'
import InputField from "../components/InputField.jsx"
import "../../css/signin-signup.css"
import {validateEmail} from "../../helpers/validateEmail.js"
import CustomAlert from "../components/CustomAlert.jsx"

const SignUp = () => {
    // useState to store user data introduced on its fields.
    const [userData, setUserData] = useState({
        email: "",
        user: "",
        password: "",
        passwordRepeated: "",
        termsAndConditionsAccepted: false
    })

    // useState to store error messages for each form field.
    const [errors, setErrors] = useState({
        email: "",
        user: "",
        password: "",
        passwordRepeated: ""
    })

    // useState to store parameters to show an alert using CustomAlert component
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    // Adds/Overwrites changed fields data on userData useState
    const handleChange = (e) => {
        const { name, value, checked } = e.target
        setUserData({
            ...userData,
            [name]: name === "termsAndConditionsAccepted" ? checked : value
        })
    }

    // Function to validate fields on blur and store errors on the errors useState
    const handleBlur = (e) => {
        const { name, value } = e.target
        const validationError = validateField(name, value)
        setErrors({
            ...errors,
            [name]: validationError,
        })
    }

    // Function to validate fields and return an error if gotten one
    const validateField = (name, value) => {
        let error = ""
        if (name === "email" && !validateEmail(value)) {
            error = `The email address introduced isn't valid`
        } else if ((name === "password" || name === "passwordRepeated") && value.length < 6) {
            error = `The password should have at least 6 characters`
        }else if(name === "passwordRepeated" && value !== userData.password) {
            error = `This passwaord doesn't match with the one you introduced above.`
        }else if (name === "user" && value.length < 3) {
            error = `The field user should be at least 3 characters long`
        }
        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const hasErrors = Object.values(errors).some((error) => error !== "")
        const hasEmptyFields = Object.keys(userData).some(
            (key) => key !== "termsAndConditionsAccepted" && userData[key] === ""
        )

        // We display an alert if we try to submit the form without accepting our terms and conditions
        if (!userData.termsAndConditionsAccepted) {
            setAlert({
                show: true,
                message: "You must accept our terms and conditions in order to create an account.",
                type: "error"
            })
            return
        }

        // We display an alert if we try to submit the form with incorrect fields
        if (hasErrors) {
            setAlert({
                show: true,
                message: "The form has invalid fields, you should fix them before creating your account.",
                type: "error"
            })
            return
        }

        // We display an error if we try to submit the form with empty fields without
        if (hasEmptyFields) {
            setAlert({
                show: true,
                message: "The form has empty fields, you should fill them before creating your account.",
                type: "error"
            })
            return
        }

        setAlert({
            show: true,
            message: "Account created successfully!",
            type: "success"
        })
    }


    const {email, user, password, passwordRepeated} = userData

    return (
        <main id={"account-form-container"}>
            <form onSubmit={handleSubmit} id={'account-form'}>
                <h2>Sign up</h2>
                <InputField
                    className={"form-textbox"}
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                />
                <InputField
                    className={"form-textbox"}
                    id="user"
                    name="user"
                    placeholder="Username"
                    value={user}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.user}
                />
                <InputField
                    className={"form-textbox"}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                />
                <InputField
                    className={"form-textbox"}
                    id="passwordRepeated"
                    type="password"
                    name="passwordRepeated"
                    placeholder="Repeat your password"
                    value={passwordRepeated}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.passwordRepeated}
                />
                <div id="checkbox-container">
                    <input
                        id="terms-checkbox"
                        type="checkbox"
                        name={"termsAndConditionsAccepted"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <label htmlFor="terms-checkbox">I accept terms and conditions</label>
                </div>
                <button type="submit" id="form-signin-btn" value="Sign in">Sign up</button>
            </form>
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