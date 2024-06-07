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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={charityName}
                    onChange={(e) => setCharityName(e.target.value)}
                />
                <br/>
                <input 
                    type="password"
                    value={charityPassword}
                    onChange={(e) => setCharityPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Charity Login</button>
            </form>
        </div>
    )

}
export default CharitySignIn