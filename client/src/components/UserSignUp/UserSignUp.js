import { useState } from "react";
import { useEffect } from "react";

import "./UserSignUp.css"

import { useFormik } from "formik";
import * as yup from "yup";

function UserSignUp(){

    const [refreshPage, setRefreshPage] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
            })
    }, [refreshPage])
    console.log(users)

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        username: yup.string().required("Must enter a username").max(15),
        password: yup.string().required("Must enter a password").min(8)
    })

    const formik = useFormik({
        initialValues: {
          email: "",
          username: "",
          user_icon: "",
          password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          fetch("/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          })
            .then((res) => {
              if (res.status === 200) {
                setRefreshPage(!refreshPage);
                resetForm();
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });


    return(
        <form onSubmit={formik.handleSubmit}>
            <div className="emailSignUp">
                <label className="emailLabel">Email Address</label>
                <input 
                    className="emailSignUpInput"
                    type="text"
                    name="email"
                    placeholder="Please Enter Your Email Address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </div>

            <br/>

            <div className="passwordSignUp">
                <label className="passwordLabel">Password</label>
                <input 
                    className="passwordSignUpInput"
                    type="text"
                    name="password"
                    placeholder="Please Enter Your Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>

            <br/>

            <div className="userNameSignUp">
                <label className="userNameLabel">Username</label>
                <input 
                    className="userNameSignupInput"
                    type="text"
                    name="username"
                    placeholder="Please Enter Desired Username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
            </div>

            <br/>

            <div className="userImgSignUp">
                <label className="userIconLabel">User Image</label>
                <input 
                    className="userIconSignupInput"
                    type="text"
                    name="user_icon"
                    placeholder="Please Enter your Profile Picture"
                    onChange={formik.handleChange}
                    value={formik.values.user_icon}
                />
            </div>

            <button type="submit" className="signUpFormButton">Submit</button>
        </form>
    )
}
export default UserSignUp