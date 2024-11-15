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

    const {name, surname, email, phone} = contactData;

    return (
        <>
            <h2>Contact Us:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="text"
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