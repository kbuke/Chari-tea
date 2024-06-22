
import { Link, useOutletContext } from "react-router-dom"

import "./UserSignUpSignIn.css"

import UserSignUp from "../components/UserSignUp/UserSignUp"
import { useState } from "react"


function UserSignUpSignIn(){

    const appData = useOutletContext()
    const users = appData.users
    const setUsers = appData.setUsers
    const setSelectUserSignUp = appData.setSelectUserSignUp

    console.log(users)


    return(
        <div className="signUpInForm">
            <h1>User Sign Up </h1>
            <h2>Already have an account? Click <Link to="/usersignin">Here</Link></h2>
            <div className="signUpContainer">
                <UserSignUp 
                    setUsers={setUsers} 
                    users={users}
                    setSelectUserSignUp={setSelectUserSignUp}
                />
            </div>
        </div>
    )
}
export default UserSignUpSignIn