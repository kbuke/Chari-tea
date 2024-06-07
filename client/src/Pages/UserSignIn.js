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
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <input 
                    type="text"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default UserSignIn