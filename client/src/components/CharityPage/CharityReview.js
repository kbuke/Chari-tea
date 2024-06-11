import { Link } from "react-router-dom"
import "./CharityReview.css"

function CharityReview({review, loggedInUser}){

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

    return(
        <>
            <div className="donationHeaderGrid">
                <Link
                    to={`/users/${review.user_id}`}
                >
                    <img className="reviewerImg" src={review.user.user_icon}/>
                </Link>
                <h2>{review.review_title}</h2>
                <h5>{review.review_date}</h5>
            </div>
            <br/>
            <div className="reviewContentGrid">
                <Link
                    to={`/users/${review.user_id}`}
                >
                    <h3>{review.user.username}</h3>
                </Link>
                <div className="reviewContent">
                    {review.charity_review && review.charity_review.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                {review.user_id == loggedInUser.id? 
                    <div>
                        <button>Edit Review</button>
                        <button onClick={handleDeleteReview}>Delete Review</button>
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}
export default CharityReview