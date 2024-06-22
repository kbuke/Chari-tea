import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./UserSignUp.css"

import { useFormik } from "formik";
import * as yup from "yup";

function UserSignUp({
    users,
    setUsers,
    setSelectUserSignUp
}) {
    console.log(users)

    const [refreshPage, setRefreshPage] = useState(false);
    const [signedUp, setSignedUp] = useState(false)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string()
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username must be less than 50 characters")
            .required("Must enter a username"),
        email: yup.string()
            .email("Invalid email")
            .required("Must enter email"),
        password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Must enter a password"),
        userImg: yup.string()
            .url("Invalid URL for user image")
            .required("Must enter a user image")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            userImg: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => {
                if (res.status === 201) {
                    return res.json(); // Parse the JSON response
                }
                throw new Error('Failed to create user');
            }).then((newUser) => {
                setUsers([...users, newUser]) // Update the state with the new user
                setSelectUserSignUp(false)
                setRefreshPage(!refreshPage);
                setSignedUp(true);
                navigate('/')
            }).catch((error) => {
                console.error("Error creating user:", error);
            });
        }
    });

    return (
        <div>
            <div className="signupConfirmed">{signedUp? `${formik.values.username} has successfully created an account`:null}</div>
            <form onSubmit={formik.handleSubmit} className="signUpForm">
                <input
                    type="text"
                    name="username"
                    className="usernameSignUp"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Enter Your Username"
                />
                {formik.errors.username && <div className="usernameError">{formik.errors.username}</div>}
                <br/>
                <input
                    type="email"
                    name="email"
                    className="userEmailSignUp"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email"
                />
                {formik.errors.email && <div className="emailError">{formik.errors.email}</div>}
                <br/>
                <input
                    type="password"
                    name="password"
                    className="userPasswordSignUp"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                />
                {formik.errors.password && <div>{formik.errors.password}</div>}
                <br/>
                <input
                    type="text"
                    name="userImg"
                    className="userImgSignUp"
                    value={formik.values.userImg}
                    onChange={formik.handleChange}
                    placeholder="User Image URL"
                />
                {formik.errors.userImg && <div>{formik.errors.userImg}</div>}
                <button type="submit" className="submitNewUser">Submit</button>
            </form>
        </div>
    );
}

export default UserSignUp;