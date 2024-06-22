import { useState } from "react"

import "./NewDonation.css"

function NewDonation({
    charityId,
    allDonations,
    setAllDonations,
    setDonation
}){

    const[currentDonation, setCurrentDonation] = useState("")

    const handleDonation = (e) => {
        e.preventDefault()
        setCurrentDonation(parseFloat(e.target.value))
    }

    const handleNewDonation = (e) => {
        e.preventDefault()
        console.log({
            amount_donated: currentDonation,
            charity_id: charityId
        })
        fetch("/donations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount_donated: currentDonation,
                charity_id: charityId
            }),
        })
        .then((r) => { 
            if(r.ok) {
                return r.json()
            }
            throw new Error("Failed to donate")
        })
        .then((newDonation) => setAllDonations([...allDonations, newDonation]))
        setDonation(false)
        window.location.reload();
    }
    console.log(allDonations)

    return(
        <form 
            className="newDonationContainer"
            onSubmit={handleNewDonation}
        >
            <h1>£ 
                <input 
                    className="donationAmountInput"
                    placeholder="Enter the amount you wish to donate"
                    onChange={handleDonation}
                />
            </h1>
            <button className="newDonateButton">Donate</button>
        </form>
    )
}
export default NewDonation