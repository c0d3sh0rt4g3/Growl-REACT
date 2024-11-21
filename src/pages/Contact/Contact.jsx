import React, { useState } from "react"
import CustomAlert from "./components/CustomAlert.jsx"
import InputField from "../components/InputField.jsx"
import {validateEmail} from "../../helpers/validateEmail.js";

const Contact = () => {
    // useState to store form data introduced on its fields.
    const [contactData, setContactData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    })
    // useState to store error messages for each form field.
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    })
    // useState to store parameters to show an alert using CustomAlert component
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    // Function to handle the submission of the form
    const handleSubmit = (e) => {
        e.preventDefault()
        const hasErrors = Object.values(errors).some((error) => error !== "")
        const hasEmptyFields = Object.values(contactData).some((data) => data === "")
        // We display an alert if we try to submit the form with incorrect fields
        if (hasErrors) {
            setAlert({
                show: true,
                message: "The form has invalid fields, you should fix them before submitting it.",
                type: "error"
            })
            return
        // We display an error if we try to submit the form with empty fields without
        } else if (hasEmptyFields) {
            setAlert({
                show: true,
                message: "The form has empty fields, you should fill them before submitting it.",
                type: "error"
            })
            return
        }

        setAlert({
            show: true,
            message: "Contact data sent successfully!",
            type: "success"
        })

        // Reset contactData and errors state on succesful submit
        setContactData({
            name: "",
            surname: "",
            email: "",
            phone: "",
            message: ""
        })

        setErrors({
            name: "",
            surname: "",
            email: "",
            phone: "",
            message: ""
        })

        console.log(`Name: ${contactData.name}\nSurname: ${contactData.surname}\nEmail: ${contactData.email}\nPhone: ${contactData.phone}`)
    }

    // Add/Overwrites changed fields data on contactData useState
    const handleChange = (e) => {
        const { name, value } = e.target
        setContactData({
            ...contactData,
            [name]: value
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
        } else if (name === "phone" && !validatePhone(value)) {
            error = `The phone number introduced isn't valid`
        } else if (value.length < 3) {
            error = `The field ${name} should be at least 3 characters long`
        }
        return error
    }

    // We check if the phone number is valid by testing it through a regex that checks if it has 9 digits and the optional prefix +34
    const validatePhone = (phone) => /^(\+34)?\d{9}$/.test(phone)

    const { name, surname, email, phone, message } = contactData

    return (
        <div id={"#account-form-container"}>
            <form id={"account-form"} onSubmit={handleSubmit}>
                <h2>Contact Us:</h2>
                <InputField
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                />
                <InputField
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.surname}
                />
                <InputField
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                />
                <InputField
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                />
                <textarea
                    className={"form-textbox"}
                    id="message"
                    name="message"
                    placeholder="Write us"
                    value={message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="4"
                    cols="50"
                />
                {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
                <button id={"form-login-btn"} type="submit">Send</button>
            </form>

            {alert.show && (
                <CustomAlert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
        </div>
    )
}

export default Contact
