import { useState } from "react"
import { Link } from "react-router-dom"

import "./UserSignUpSignIn.css"

import UserSignUp from "../components/UserSignUp/UserSignUp"


function UserSignUpSignIn(){


    return(
        <div className="signUpInForm">
            <h1>User Sign Up </h1>
            <h2>Already have an account? Click <Link to="/usersignin">Here</Link></h2>
            <div className="signUpContainer">
                <UserSignUp />
            </div>
        </div>
    )
}
export default UserSignUpSignIn