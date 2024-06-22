import { useState } from "react"

import "./NewReview.css"

function NewReview({
    allReviews,
    setAllReviews,
    charityId
}){

    const [reviewTitle, setReviewTitle] = useState("")
    const[reviewing, setReviewing] = useState("")

    const handleReviewTitle = (e) => {
        e.preventDefault()
        setReviewTitle(e.target.value)
    }

    const handleReview = (e) => {
        e.preventDefault()
        setReviewing(e.target.value)
    }

    const handleNewReview = (e) => {
        e.preventDefault()
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review_title: reviewTitle,
                charity_review: reviewing,
                charity_id: charityId
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json()
            }
            throw new Error("Failed to review")
        })
        .then((newReview) => setAllReviews([...allReviews, newReview]))
        window.location.reload();
    }

    return(
        <form onSubmit={handleNewReview}>
            <input 
                className="reviewTitle"
                placeholder="Please Enter Review Title"
                onChange={handleReviewTitle}
            />
            <textarea 
                className="reviewTextBox"
                placeholder="Please enter your review"
                onChange={handleReview}
            />
            <br/>
            <button
                className="submitReviewButton"
            >
                Submit Review
            </button>
        </form>
    )
}
export default NewReview