import "./NavBar.css";

import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";

function NavBar({
    userLogin, 
    setUserLogin, 
    charityLogin, 
    setCharityLogin, 
    loggedInUser, 
    loggedInCharity, 
    setLoggedInUser, 
    setLoggedInCharity,
    charityLink,
    setCharityLink,
    userLink,
    setUserLink,
    blogLink,
    setBlogLink,
    charityIcon,
    setCharityIcon
}){

    console.log(blogLink)

    const handleLogoClick = () => {
        setCharityLink(false)
        setUserLink(false)
        setBlogLink(false)
        setCharityIcon(false)
    }

    const handleCharityLogoClick = () => {
        setCharityLink(false)
        setUserLink(false)
        setBlogLink(false)
        setCharityIcon(true)
    }

    const handleCharityLink = () => {
        setCharityLink(true)
        setUserLink(false)
        setBlogLink(false)
    }

    const handleUserLink = () => {
        setCharityLink(false)
        setUserLink(true)
        setBlogLink(false)
    }

    const handleBlogLink = () => {
        setCharityLink(false)
        setUserLink(false)
        setBlogLink(true)
    }
    
    const handleUserLogOut = () => {
        fetch("/userlogout", {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setUserLogin(false);
                setLoggedInUser(!loggedInUser)
            } else {
                // Handle the error appropriately
                console.error("Logout failed");
            }
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
    }
    console.log(loggedInCharity)

    const handleCharityLogOut = () => {
        fetch('/charitylogout', {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                setCharityLogin(false);
                setLoggedInCharity(!loggedInCharity)
            } else {
                console.error("Logout failed")
            }
        })
        // setCharityLogin(!charityLogin)
        .catch((error) => {
            console.error("Error during logout:", error)
        })
    }

    if(userLogin && !charityLogin){
        return(
            <div className="navBarConatiner">
                <NavLink
                    to="/"
                >
                    <div className="logoContainer" onClick={handleLogoClick}>
                        
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/charities"
                    className="nav-link"
                >
                    <div onClick={handleCharityLink} className={charityLink? "selectedNav" : "charityNavContainer"}>
                        <h3 className="charityNavText">View Charities</h3>
                        <h3 className="charityIconNav">🕊️</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/users"
                    className="nav-link"
                >
                    <div onClick={handleUserLink} className={userLink? "selectedNav" : "userNavContainer"}>
                        <h3 className="userNavText">View Users</h3>
                        <h3 className="userIconNav">👤</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/blogs"
                    className="nav-link"
                >
                    <div onClick={handleBlogLink} className={blogLink? "selectedNav" : "blogNavContainer"}>
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
                    <div className="logoContainer" onClick={handleLogoClick}>
                        
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/charities"
                    className="nav-link"
                >
                    <div className={charityLink? "selectedNav" : "charityNavContainer"} onClick={handleCharityLink}>
                        <h3 className="charityNavText">View Charities</h3>
                        <h3 className="charityIconNav">🕊️</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/users"
                    className="nav-link"
                >
                    <div className={userLink? "selectedNav" : "userNavContainer"} onClick={handleUserLink}>
                        <h3 className="userNavText">View Users</h3>
                        <h3 className="userIconNav">👤</h3>
                    </div>
                </NavLink>
                <br/>
                <NavLink
                    to="/blogs"
                    className="nav-link"
                >
                    <div className={blogLink? "selectedNav" : "blogNavContainer"} onClick={handleBlogLink}>
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
                    <div className= "loggedInIcon" onClick={handleCharityLogoClick}>
                        <img className={charityIcon? "charityIconSelect" : "loggedInImg"} src={loggedInCharity.charity_icon}/>
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



