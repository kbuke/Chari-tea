import { useState } from "react"
import "./MakeDonation.css"
import { useNavigate } from "react-router-dom"

function MakeDonation({charityId, loggedInUser}){
    const userId = loggedInUser.id 
    
    const navigate = useNavigate()

    const[amountDonated, setAmountDonated] = useState("")

    const handleChange = (e) => {
        setAmountDonated(e.target.value)
    }

    const floatDonation = parseFloat(amountDonated)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/donations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({floatDonation, userId, charityId})
        })
        .then((r) => {
            if(r.ok){
                navigate(`/`)
                return r.json()
            } else {
                r.json().then((error) => console.error(error))
                throw new Error("Invalid Donation")
            }
        })
        .then((donation) => {
            console.log(donation)
        })
        .catch((error) => console.error(error))
    }
    
    return(
        <form onSubmit={handleSubmit} className="makeDonationContainer">
            <h2>£
                <input
                    type="text"
                    className="newDonationAmount"
                    placeholder="Enter the amount you wish to donate"
                    value={amountDonated}
                    onChange={handleChange}
                />
            </h2>
            <button type="submit" className="submitDonationButton">Submit Donation</button>
        </form>
    )
}
export default MakeDonation