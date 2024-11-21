import React, { useState } from "react"
import CustomAlert from "./components/CustomAlert.jsx"
import "../../css/login-signin.css"
import InputField from "../components/InputField.jsx"

const Contact = () => {
    const [contactData, setContactData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    })
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: ""
    })
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
        const hasErrors = Object.values(errors).some((error) => error !== "")
        const hasEmptyFields = Object.values(contactData).some((data) => data === "")
        if (hasErrors) {
            setAlert({
                show: true,
                message: "The form has invalid fields, you should fix them before submitting it.",
                type: "error"
            })
            return
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

        console.log(`Name: ${contactData.name}\nSurname: ${contactData.surname}\nEmail: ${contactData.email}\nPhone: ${contactData.phone}`)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setContactData({
            ...contactData,
            [name]: value
        })
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        const validationError = validateField(name, value)
        setErrors({
            ...errors,
            [name]: validationError,
        })
    }

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

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

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
