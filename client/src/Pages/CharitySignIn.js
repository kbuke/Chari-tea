
import "./CharitySignIn.css"

import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react"

function CharitySignIn(){
    const [charityNameInput, setCharityNameInput] = useState("")
    const [charityPassword, setCharityPassword] = useState("")
    const [failedLogin, setFailedLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const appData = useOutletContext()

    //See if a charity is logged in
    const charityLoggedIn = appData.charityLoggedIn 
    const setCharityLoggedIn = appData.setCharityLoggedIn

    //Access where the charity will be held
    const onCharityLogin = appData.onCharityLogin 

    //Hanlde login
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/charitylogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({charityNameInput, charityPassword}),
        })
        .then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                setFailedLogin(true)
            }
        })
        .then(user => {
            if(user) {
                onCharityLogin(user)
                setCharityLoggedIn(true)
                navigate("/")
            }
        })
    }

    console.log(charityLoggedIn)

    return(
        <div className="charityLoginPage">
            {failedLogin?
                <div className="failedLogin">
                    <h1>Failed Login</h1>
                    <h3>Username and/or Password are Incorrect</h3>
                    <h3>Please Try Again</h3>
                </div>
                :
                null
            }
            <form onSubmit={handleSubmit} className="charityLoginForm">
                <input
                    type="text"
                    value={charityNameInput}
                    onChange={(e) => setCharityNameInput(e.target.value)}
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
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="charityPasswordButton"
                    >
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