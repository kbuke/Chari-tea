import { useState } from "react"
import "./CharityLogo.css"

function CharityLogo({chairtyPic, charityLocation, charityDescription, charityName, donate, setDonate}){

    const handleClick = () => {
        setDonate(!donate)
    }

    return(
        <div className="mainInfoContainer">
            <div className="imageContainer">
                <img className="charityPic" src={chairtyPic}/>
            </div>

            <div className="charityInfo">
                <h2>{charityDescription}</h2>
                <h2>📍 {charityLocation}</h2>
                <button className="donateButton" onClick={handleClick}>
                    {donate?
                        <h2>Cancel Donation to {charityName}</h2>
                        :
                        <h2>Donate to {charityName}</h2>
                    }
                </button>
            </div>
        </div>
    )
}
export default CharityLogo