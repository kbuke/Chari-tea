
import "./NavBar.css"
import { NavLink } from "react-router-dom"

import logo from "../assets/logo.png"

function NavBar({
    userLoggedIn, 
    setUserLoggedIn,

    charityLoggedIn,
    setCharityLoggedIn,

    selectCharity,
    setSelectCharity,

    selectUser,
    setSelectUser,

    selectBlogs,
    setSelectBlogs,

    selectUserSignUp,
    setSelectUserSignUp,

    selectUserSignIn,
    setSelectUserSignIn,

    selectCharitySignUp,
    setSelectCharitySignUp,

    selectCharitySignIn,
    setSelectCharitySignIn,

    user,
    setUser,

    charity,
    setCharity
}){


    const onHome = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onCharity = () => {
        setSelectCharity(true)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onUser = () => {
        setSelectCharity(false)
        setSelectUser(true)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onBlog = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(true)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onUserSignUp = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(true)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onUserSignIn = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(true)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(false)
    }

    const onCharitySignUp = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(true)
        setSelectCharitySignIn(false)
    }

    const onCharitySignIn = () => {
        setSelectCharity(false)
        setSelectUser(false)
        setSelectBlogs(false)
        setSelectUserSignUp(false)
        setSelectUserSignIn(false)
        setSelectCharitySignUp(false)
        setSelectCharitySignIn(true)
    }


    const handleUserLogout = () => {
        fetch('/userlogout', {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok){
                console.log("logging out")
                setUser(null)
                setUserLoggedIn(false)
            }
        })
    }

    const handleCharityLogout = () => {
        fetch('/charitylogout', {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setCharity(null)
                setCharityLoggedIn(false)
            }
        })
    }
    
    const checkLogIn = 
        (userLoggedIn)?
        <div>
            <NavLink
                className="nav-link"
            >
                <div className="logOutContainer" onClick={handleUserLogout}>
                    <h3 className="logOutNavText">Log Out</h3>
                    <h3 className="logoutIconNav">🏃</h3>
                </div>
            </NavLink>
            <br/>
            <NavLink
                to={`/users/${user ? user.id : null}`}
            >
                <img 
                    className="loggedInImg" 
                    src={user? user.user_icon : null}
                    alt="loggedImg"
                />
            </NavLink>
        </div>
        :
        (charityLoggedIn)?
        <div>
            <NavLink
                className="nav-link"
            >
                <div className="logOutContainer" onClick={handleCharityLogout}>
                    <h3 className="logOutNavText">Log Out</h3>
                    <h3 className="logoutIconNav">🏃</h3>
                </div>
            </NavLink>
            <br/>
            <NavLink
                to={`/charities/${charity ? charity.id : null}`}
            >
                <div className= "loggedInIcon" >
                    <img 
                        className="loggedInImg" 
                        src={charity ? charity.charity_icon : null}
                        alt="loggedImg"
                    />
                 </div>
            </NavLink>
        </div>
        :
        <div className="userCharitySignInSignUp">
            <div className="userSignInSignUp">
                <NavLink
                    to="/usersignup"
                >
                    <div 
                        className={selectUserSignUp ? "selectedNav" : "userSignUpContainer"}
                        onClick={onUserSignUp}
                    >
                        <h4 className="userSignUpText">User Sign Up</h4>
                    </div>
                </NavLink>

                <NavLink
                    to="/usersignin"
                >
                    <div 
                        className={selectUserSignIn ? "selectedNav" : "userSignInContainer"}
                        onClick={onUserSignIn}
                    >
                        <h4 className="userSignInText">User Sign In</h4>
                    </div>
                </NavLink>
            </div>

            <div className="charitySignInSignUp">
                <NavLink
                    to="/charitysignup"
                >
                    <div 
                        className={selectCharitySignUp ? "selectedNav" : "charitySignUpContainer"}
                        onClick={onCharitySignUp}
                    >
                        <h4 className="charitySignUpText">Charity Sign-Up</h4>
                    </div>
                </NavLink>

                <NavLink
                    to="/charitysignin"
                >
                    <div 
                        className={selectCharitySignIn ? "selectedNav" : "charitySignInContainer"}
                        onClick={onCharitySignIn}
                    >
                        <h4 className="charitySignInText">Charity Sign In</h4>
                    </div>
                </NavLink>
            </div>            
        </div>
        



    return(
        <div className="navBarConatiner">
            <div className="logoContainer">
                <NavLink
                    to="/"
                    onClick={onHome}
                >
                    <img 
                        src={logo} 
                        className="logo"
                        alt="charityLogo"
                    />
                </NavLink>

            </div>

            <NavLink
                to="/charities"
            >
                <div 
                    onClick={onCharity}
                    className={selectCharity ? "selectedNav" : "charityNavContainer"}
                >
                    <h3 className="charityNavText">View Charities</h3>
                    <h3 className="charityIconNav">🕊️</h3>
                </div>
            </NavLink>

            <NavLink
                to="/users"
            >
                <div 
                    onClick={onUser} 
                    className={selectUser? "selectedNav" : "userNavContainer"}
                >
                    <h3 className="userNavText">View Users</h3>
                    <h3 className="userIconNav">👤</h3>
                </div>
            </NavLink>
            <br/>

            <NavLink
                to="/blogs"
            >
                <div 
                    onClick={onBlog} 
                    className={selectBlogs? "selectedNav" : "blogNavContainer"}
                >
                    <h3 className="blogsNavText">View Blogs</h3>
                    <h3 className="blogIconNav">📝</h3>
                </div>
            </NavLink>

            {checkLogIn}

            
        </div>
    )
}
export default NavBar




