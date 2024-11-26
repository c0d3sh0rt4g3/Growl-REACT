import React, {useContext, useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {validateEmailRegex} from "../../helpers/validateEmail.js";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";

const SignIn = () => {
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

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

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signIn(values.email, values.password)
            setAlert({
                show: true,
                message: `User registered with email: ${values.email}`,
                type: "success"
            })
            const newUser = {
                email: values.email,
                username: values.user,
                tags: []
            }
            users.push(newUser)

            localStorage.setItem("usersDB", JSON.stringify(users))
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
            />
            <h2>Sign in page</h2>
        </main>
    );
};

export default SignIn;