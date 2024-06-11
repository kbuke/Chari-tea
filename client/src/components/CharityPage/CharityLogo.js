
import "./CharityLogo.css"
import { useNavigate } from "react-router-dom"

import MakeDonation from "./MakeDonation"
import WriteReview from "./WriteReview"
import { useState } from "react"

function CharityLogo({
    chairtyPic, 
    charityLocation, 
    charityDescription, 
    charityName, 
    donate, 
    setDonate, 
    charityId, 
    loggedInUser,
    loggedInCharity,
    writeReview,
    setWriteReview, 
}){

    const navigate = useNavigate()

    const handleDonateClick = () => {
        setDonate(!donate)
        setWriteReview(false)
    }

    const handleReviewClick = () => {
        setWriteReview(!writeReview)
        setDonate(false)
    }

    const handleBlogClick = () => {
        navigate("/newblog")
    }

    const newDonation = donate? 
        <MakeDonation charityId={charityId} loggedInUser={loggedInUser}/>
        :
        null;

    const newReview = writeReview?
        <WriteReview 
            charityId={charityId} 
            userId={loggedInUser.id}
        />
        :
        null
    

    return(
        <div className="mainInfoContainer">
            <div className="imageContainer">
                <img className="charityPic" src={chairtyPic}/>
            </div>

            <div className="charityInfo">
                <h2>{charityDescription}</h2>
                <h2>📍 {charityLocation}</h2>
                {loggedInUser? 
                    <div>
                        <button className={donate? "selectedButton" : "donateButton"} onClick={handleDonateClick}>
                            {donate?
                                <h2>Cancel Donation to {charityName}</h2>
                                :
                                <h2>Donate to {charityName}</h2>
                            }
                        </button>

                        <button className={writeReview? "selectedButton" : "reviewButton"} onClick={handleReviewClick}>
                            {writeReview?
                                <h2>Stop Reviewing</h2>
                                :
                                <h2>Write a Review for {charityName}</h2>
                            }
                        </button>
                    </div>
                    :
                    null
                }
                {loggedInCharity.id == charityId?
                    <button onClick={handleBlogClick}>
                        Write New Blog
                    </button>
                    :
                    null
                }
            </div>

            <>
                {newDonation}
                {newReview}
            </>
        </div>
    )
}
export default CharityLogo