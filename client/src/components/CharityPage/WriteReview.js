import "./WriteReview.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function WriteReview({
    charityId, 
    userId,
}){
    const [reviewTitle, setReviewTitle] = useState("")
    const [reviewContent, setReviewContent] = useState("")
    const [activeReview, setActiveReview] = useState(false)

    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        e.preventDefault()
        setReviewTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        e.preventDefault()
        setReviewContent(e.target.value)
    }

    const activeOn = () => {
        setActiveReview(true)
    }

    const activeOff = () => {
        setActiveReview(false)
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        fetch('/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({reviewTitle, reviewContent, charityId, userId})
        })
        .then((r) => {
            if(r.ok){
                navigate(`/`)
                return r.json()
            } else {
                r.json().then((error) => console.error(error))
                throw new Error("Invalid Review")
            }
        })
        .then((review) => {
            console.log(review)
        })
        .catch((error) => console.error(error))
    }

    return(
        <>
            <form className="newReviewForm" onSubmit={handleReviewSubmit}>
                <input 
                    className="reviewTitleInput"
                    placeholder="Enter the title of your review"
                    onChange={handleTitleChange}
                    onClick={activeOff}
                />
                <br/>
                <textarea 
                    className={activeReview? "selectedBox" :"reviewContentInput"}
                    placeholder="Please Type Your Review"
                    onChange={handleContentChange}
                    onClick={activeOn}
                />
                <button className="submitReview">Submit Review</button>
            </form>
        </>
    )
}
export default WriteReview