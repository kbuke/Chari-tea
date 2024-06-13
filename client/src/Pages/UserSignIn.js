import { useState } from "react"
import "./UserSignIn.css"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function UserSignIn(){

    const navigate = useNavigate()

    const appData = useOutletContext()
    
    const userLogin = appData.userLogin
    const setUserLogin = appData.setUserLogin

    const setLoggedInUser = appData.setLoggedInUser

    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handlePassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/userlogin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, userPassword}),
        })
        .then((r) => {
            console.log(r)
            if(r.ok) {
                setUserLogin(!userLogin)
                navigate("/")
                return r.json()
            } else {
                throw new Error("Invalid login")
            }
        })
        .then((user) => {
            console.log(user)
            setLoggedInUser(user)
        })
        .catch((error) => console.error(error))
    }

    return(
        <div className="userLoginPage">
            <form onSubmit={handleSubmit} className="userLoginForm">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="userNameText"
                    placeholder="Enter Users Name"
                />
                <br/>
                <div className="passwordSelection">
                    <input 
                        type={showPassword? "text" : "password"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="userPasswordText"
                        placeholder="Enter Charities Password"
                    />
                    <button onClick={handlePassword} className="userPasswordButton">
                        <h3>👁️</h3>
                    </button>
                </div>
                <br/>
                <button type="submit" className="userLoginButton">User Login</button>
            </form>
        </div>
    )
}
export default UserSignIn