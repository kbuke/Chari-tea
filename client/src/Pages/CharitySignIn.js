import "./CharitySignIn.css"

import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react"

function CharitySignIn(){
    const navigate = useNavigate()

    const appData = useOutletContext()

    const charityLogin = appData.charityLogin
    const setCharityLogin = appData.setCharityLogin 

    const setLoggedInCharity = appData.setLoggedInCharity

    const [charityName, setCharityName] = useState("")
    const [charityPassword, setCharityPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handlePassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/charitylogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({charityName, charityPassword}),
        })
        .then((r) => {
            console.log(r)
            if(r.ok) {
                setCharityLogin(!charityLogin)
                navigate("/")
                return r.json()
            } else {
                throw new Error("Invalid Login")
            }
        })
        .then((user) => {
            console.log(user)
            setLoggedInCharity(user)
        })
        .catch((error) => console.error(error))
    }

    return(
        <div className="charityLoginPage">
            <form onSubmit={handleSubmit} className="charityLoginForm">
                <input
                    type="text"
                    value={charityName}
                    onChange={(e) => setCharityName(e.target.value)}
                    className="charityNameText"
                    placeholder="Enter Charities Name"
                />
                <br/>
                <div className="passwordSelection">
                    <input 
                        type={showPassword? "text" : "password"}
                        value={charityPassword}
                        onChange={(e) => setCharityPassword(e.target.value)}
                        className="charityPasswordText"
                        placeholder="Enter Charities Password"
                    />
                    <button onClick={handlePassword} className="charityPasswordButton">
                        <h3>👁️</h3>
                    </button>
                </div>
                <br/>
                <button type="submit" className="charityLoginButton">Charity Login</button>
            </form>
        </div>
    )

}
export default CharitySignIn