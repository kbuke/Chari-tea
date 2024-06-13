
import { Link } from "react-router-dom"
import "./CharityReview.css"
import { useState } from "react"

function CharityReview({
    review, 
    loggedInUser,
    reviewTitle,
    setReviewTitle,
    reviewContent,
    setReviewContent
}){

    const[updateReview, setUpdateReview] = useState(false)

    const handleReviewTitleChange = (e) => {
        e.preventDefault()
        setReviewTitle(e.target.value)
    }

    const handleReviewContentChange = (e) => {
        e.preventDefault()
        console.log(e.target)
        setReviewContent(e.target.value)
    }

    const handleDeleteReview = (e) => {
        e.preventDefault()

        fetch(`/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                console.log("Review Deleted")
            } else {
                console.error("Failed to delete this review")
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    }


    const handleUpdateReview = () => {
        setUpdateReview(!updateReview)
        if (updateReview){
            fetch(`/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review_title: reviewTitle ? reviewTitle : review.review_title,
                    charity_review: reviewContent ? reviewContent : review.charity_review
                }),
            })
            .then((r) => {
                if(r.ok) {
                    console.log("Review Updated")
                } else {
                    console.error("Failed to update this review")
                }
            })
            .catch((error) => {
                console.error("Error", error)
            })
        }
    }

    return(
        <>
            <div className="donationHeaderGrid">
                <Link
                    to={`/users/${review.user_id}`}
                >
                    <img className="reviewerImg" src={review.user.user_icon}/>
                </Link>
                {updateReview? 
                    <textarea
                        onChange={handleReviewTitleChange}
                    >
                        {review.review_title}</textarea>
                    :
                    <h2>{review.review_title}</h2>
                }
                <h5>{review.review_date}</h5>
            </div>
            <br/>
            <div className="reviewContentGrid">
                <Link
                    to={`/users/${review.user_id}`}
                >
                    <h3>{review.user.username}</h3>
                </Link>
                {updateReview?
                    <textarea 
                        className="newReview"
                        onChange={handleReviewContentChange}
                    >
                        {review.charity_review}
                    </textarea>
                    :
                    <div className="reviewContent">
                        {review.charity_review && review.charity_review.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                }
                {review.user_id == loggedInUser.id? 
                    <div>
                        <button onClick={handleUpdateReview}>
                            {updateReview? "Cancel Edit" : "Edit Review"}
                        </button>
                        {updateReview? 
                            <button onClick={handleUpdateReview}>Submit Edit</button>
                            :
                            <button onClick={handleDeleteReview}>Delete Review</button>
                        }
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}
export default CharityReview