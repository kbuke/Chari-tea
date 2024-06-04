import "./NavBar.css";
import {useState} from "react"

import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";

function NavBar(){

    return(
        <div className="navBarContainer">
            <NavLink
                to="/"
            >
                 <img className="logo" src={logo}/>
            </NavLink>

            <div className="navBarOptions">
                <NavLink
                    className="charityButton"
                    to="/charities"
                >
                    <h2 className="charityNavButton">View Charities</h2>
                </NavLink>

                <NavLink 
                    className="userButton"
                    to="/users"
                >
                    <h2>Show Users</h2>
                </NavLink>
                
                <NavLink 
                    className="fundraisingButton"
                    to="/blogs"
                >
                    <h2>View Blogs</h2>
                </NavLink>

                <NavLink
                    className="signUpSignInButton"
                    to="/signup"
                >
                    User Sign Up/Sign In
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar



