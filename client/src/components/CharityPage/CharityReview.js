
import { Link } from "react-router-dom";
import "./CharityReview.css";
import { useState } from "react";

function CharityReview({
    userId,
    charityReview,
    reviewDate,
    reviewTitle,
    reviewId,
    userName,
    userImg,
    loggedUserId,
    allReviews, 
    setAllReviews
}){
    const[editingReview, setEditingReview] = useState(false)
    const[deletingReview, setDeletingReview] = useState(false)
    const[editTitle, setEditTitle] = useState(reviewTitle)
    const[editContent, setEditContent] = useState(charityReview)

    const checkUser = userId === loggedUserId ? true : false 
    
    //Handle Edit
    const handleReviewEdit = () => {
        fetch(`/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review_title: editTitle,
                charity_review: editContent
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update review")
            }
        })
        .then((newReview) => 
        setAllReviews(allReviews.map(oldReviews =>
            oldReviews.id === newReview.id ? newReview : oldReviews
        )))
        window.location.reload();
    }

    //Set up editing buttons for blog author
    const userReviewEdit = editingReview ? 
        <>
            <button
                className="canEdit"
                onClick={() => setEditingReview(!editingReview)}
            >
                Cancel Edit
            </button>  

            <button 
                onClick={handleReviewEdit}
                className="submitReviewEdit"
            >
                Submit Edit
            </button>
        </> 
        :
        <button
            className="makeEdit"
            onClick={() => setEditingReview(!editingReview)}
        >
            Make Edit
        </button> 
    
    //Set up deletion buttons for blog author
    const userReviewDelete = (deletingReview || editingReview)? 
        null
        :
        <button 
            className="deleteReview"
            onClick={() => setDeletingReview(!deletingReview)}
        >
            Delete Review
        </button>
    
    //Handle blog deletion
    const handleReviewDelete = () => {
        fetch(`/reviews/${reviewId}`, {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok){
                setAllReviews((reviews) => 
                    reviews.filter((review) => review.id !== reviewId))
                    window.location.reload();
            }
        })
    }

    return(
        <div className="reviewContainer">
            <div className="userReviewHeader">
                <Link
                    to={`/users/${userId}`}
                >
                    <img 
                        className="userImg" 
                        src={userImg}
                        alt="userImage"
                    />
                    <h6 className="reviewUser">{userName}</h6>
                </Link>
                {editingReview ? 
                    <input 
                        className="editReviewTitle"
                        defaultValue={reviewTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    :
                    <h2>{reviewTitle}</h2>
                }
                <h4 className="postTiming">Posted {reviewDate}</h4>
            </div>
            {checkUser ? 
                <div className="charityReviewGrid">
                    {editingReview? 
                        <textarea 
                            className="editUserReview"
                            defaultValue={charityReview}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        :
                        <h3 className="userCharityReview">{charityReview}</h3>
                    }
                    {userReviewEdit}
                    {userReviewDelete}
                </div>
                :
                <h3 className="userCharityReview">{charityReview}</h3>
            }
            {deletingReview ?
                <>
                    <button
                        className="conDel"
                        onClick={handleReviewDelete}
                    >
                        Confirm Deletion
                    </button>

                    <button
                        className="canDel"
                        onClick={() => setDeletingReview(!deletingReview)}
                    >
                        Cancel Deletion
                    </button>
                </>
                :
                null
            }
        </div>
    )
}
export default CharityReview
