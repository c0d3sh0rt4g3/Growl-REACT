import React, {useState} from 'react'
import Swal from "sweetalert2"

const Contact = () => {
    const [contactData, setContactData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    })

    const   handleSubmit = e => {
        e.preventDefault()
        const hasErrors = Object.values(errors).some(error => error !== "")
        if (hasErrors) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The form has invalid fields, you should fix them before submitting it."
            })
            alert("Please fix the errors before submitting.");
            return;
        }
        Swal.fire({
            icon: "success",
            title: "Success!",
            background: "#DBE7C9",
            text: "Contact data sent successfully!"
        })
        console.log(`Name: ${contactData.name}\nSurname: ${contactData.surname}\nEmail: ${contactData.email}\nPhone: ${contactData.phone}`)
    }

    const handleChange = e => {
        const {name, value} = e.target
        setContactData({
            ...contactData,
            [name] : value
        })
    }

    const handleBlur = (e) => {
        const {name, value} = e.target
        const validationError = validateField(name, value)
         setErrors({
            ...errors,
            [name]: validationError,
        })
    }

    const validateField = (name, value) =>{
        let error = ""
        if (name === 'email' && !validateEmail(value)) {
            error = `The email address introduced isn't valid`
        }else if (name === 'phone' && !validatePhone(value)) {
            error = `The phone number introduced isn't valid`
        }else if (value.length < 3) {
            error = `The field ${name} should be at least 3 characters`
        }
        return error
    }

    // We check if the email is valid by testing it through a regex that checks if the mail given follows a common email structure
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    // We check if the phone number is valid by testing it through a regex that checks if it has 9 digits and the optional prefix +34
    const validatePhone = (phone) => /^(\+34)?\d{9}$/.test(phone)

    const {name, surname, email, phone} = contactData
    return (
        <>
            <h2>Contact Us:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Surname"
                        value={surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.surname && <p style={{ color: 'red' }}>{errors.surname}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                </div>
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Contact