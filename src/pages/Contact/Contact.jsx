import React, {useState} from 'react';

const Contact = () => {
    const [contactData, setContactData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log(`Name: ${contactData.name}\nSurname: ${contactData.surname}\nEmail: ${contactData.email}\nPhone: ${contactData.phone}`)
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setContactData({
            ...contactData,
            [name] : value
        })
    }

    // We check if the email is valid by testing it through a regex that checks if the mail given follows a common email structure
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    // We check if the phone number is valid by testing it through a regex that checks if it has 9 digits and the optional prefix +34
    const validatePhone = (phone) => /^(\+34)?\d{9}$/.test(phone)

    const {name, surname, email, phone} = contactData;

    return (
        <>
            <h2>Contact Us:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handleChange}
                />
                <button
                    type='submit'
                >
                    Send
                </button>
            </form>
        </>
    );
};

export default Contact;