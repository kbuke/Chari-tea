import "./NavBar.css";

import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";

function NavBar({userLogin, setUserLogin, charityLogin, setCharityLogin, loggedInUser, loggedInCharity}){

    const handleUserLogOut = () => {
        fetch("/userlogout", {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setUserLogin(false);
            } else {
                // Handle the error appropriately
                console.error("Logout failed");
            }
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
    }

    const handleCharityLogOut = () => {
        setCharityLogin(!charityLogin)
    }

    if(userLogin && !charityLogin){
        return(
            <div className="navBarConatiner">
                <NavLink
                    to="/"
                >
                    <div className="logoContainer">
                        
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/charities"
                    className="nav-link"
                >
                    <div className="charityNavContainer">
                        <h3 className="charityNavText">View Charities</h3>
                        <h3 className="charityIconNav">🕊️</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/users"
                    className="nav-link"
                >
                    <div className="userNavContainer">
                        <h3 className="userNavText">View Users</h3>
                        <h3 className="userIconNav">👤</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/blogs"
                    className="nav-link"
                >
                    <div className="blogNavContainer">
                        <h3 className="blogsNavText">View Blogs</h3>
                        <h3 className="blogIconNav">📝</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    className="nav-link"
                >
                    <div className="logOutContainer" onClick={handleUserLogOut}>
                        <h3 className="logOutNavText">Log Out</h3>
                        <h3 className="logoutIconNav">🏃</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to={`/users/${loggedInUser.id}`}
                >
                    <img src={loggedInUser.user_icon} className="loggedInImg"/>
                </NavLink>
            </div>
        )
    }
    else if (!userLogin && charityLogin){
        return(
            <div className="navBarConatiner">
                <NavLink
                    to="/"
                >
                    <div className="logoContainer">
                        
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/charities"
                    className="nav-link"
                >
                    <div className="charityNavContainer">
                        <h3 className="charityNavText">View Charities</h3>
                        <h3 className="charityIconNav">🕊️</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/users"
                    className="nav-link"
                >
                    <div className="userNavContainer">
                        <h3 className="userNavText">View Users</h3>
                        <h3 className="userIconNav">👤</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/blogs"
                    className="nav-link"
                >
                    <div className="blogNavContainer">
                        <h3 className="blogsNavText">View Blogs</h3>
                        <h3 className="blogIconNav">📝</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    className="nav-link"
                >
                    <div className="logOutContainer" onClick={handleCharityLogOut}>
                        <h3 className="logOutNavText">Log Out</h3>
                        <h3 className="logoutIconNav">🏃</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to={`/charities/${loggedInCharity.id}`}
                >
                    <div className="loggedInIcon">
                        <img className="loggedInImg" src={loggedInCharity.charity_icon}/>
                    </div>
                </NavLink>
            </div>
        )
    }
    else if (!userLogin && !charityLogin){
        return(
            <div className="navBarConatiner">
                <NavLink
                    to="/"
                >
                    <div className="logoContainer">
                        
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/charities"
                    className="nav-link"
                >
                    <div className="charityNavContainer">
                        <h3 className="charityNavText">View Charities</h3>
                        <h3 className="charityIconNav">🕊️</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/users"
                    className="nav-link"
                >
                    <div className="userNavContainer">
                        <h3 className="userNavText">View Users</h3>
                        <h3 className="userIconNav">👤</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/blogs"
                    className="nav-link"
                >
                    <div className="blogNavContainer">
                        <h3 className="blogsNavText">View Blogs</h3>
                        <h3 className="blogIconNav">📝</h3>
                    </div>
                </NavLink>
                <br/>
                <div className="userCharitySignInSignUp">
                    <div className="userSignInSignUp">
                        <NavLink
                            to="/usersignup"
                            className="nav-link"
                        >
                            <div className="userSignUpContainer">
                                <h4 className="userSignUpText">User Sign-Up</h4>
                            </div>
                        </NavLink>

                        <NavLink
                            to="/usersignin"
                            className="nav-link"
                        >
                            <div className="userSignInContainer">
                                <h4 className="userSignInText">User Sign In</h4>
                            </div>
                        </NavLink>
                    </div>

                    <div className="charitySignInSignUp">
                        <NavLink
                            to="/charitysignup"
                            className="nav-link"
                        >
                            <div className="charitySignUpContainer">
                                <h4 className="charitySignUpText">Charity Sign-Up</h4>
                            </div>
                        </NavLink>

                        <NavLink
                            to="/charitysignin"
                            className="nav-link"
                        >
                            <div className="charitySignInContainer">
                                <h4 className="charitySignInText">Charity Sign In</h4>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar



