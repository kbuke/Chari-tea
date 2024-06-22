import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import CharityLogo from "../components/CharityPage/CharityLogo.js";
import BlogPosts from "../components/CharityPage/BlogPosts.js";
import Donations from "../components/CharityPage/Donations.js";
import CharityReview from "../components/CharityPage/CharityReview.js";
import NewDonation from "../components/CharityPage/NewDonation.js";
import NewReview from "../components/CharityPage/NewReview.js";

import "./CharitiesPage.css";

function CharitiesPage() {
    const appData = useOutletContext();
    const charities = appData.charities;
    const charityAmountsArray = appData.charityAmountsArray;
    const userLoggedIn = appData.userLoggedIn;
    const loggedInUser = appData.user;
    const loggedUserId = loggedInUser ? loggedInUser.id : null;
    const loggedInCharity = appData.charity;
    const loggedInCharityId = loggedInCharity ? loggedInCharity.id : null;
    const params = useParams();

    const specificCharity = charities ? charities.find(charity => charity.id === parseInt(params.id)) : null;

    const [charityInfo, setCharityInfo] = useState([]);
    let [blogNumber, setBlogNumber] = useState(0);
    let [donorNumber, setDonorNumber] = useState(0);
    let [reviewNumber, setReviewNumber] = useState(0);

    const [donation, setDonation] = useState(false);
    const [writeReview, setWriteReview] = useState(false);

    useEffect(() => {
        if (specificCharity) {
            fetch(`http://127.0.0.1:5555/charities/${specificCharity.id}`)
                .then((r) => {
                    if (r.ok) {
                        return r.json();
                    }
                    throw r;
                })
                .then((charityInfo) => setCharityInfo(charityInfo))
                .catch(error => {
                    console.error("Error fetching charity info:", error);
                });
        }
    }, [specificCharity]);

    console.log('Charity Info:', charityInfo);

    // Get variables for the top of the charity page
    const charityName = charityInfo ? charityInfo.charity_name : null;
    const charityLogo = charityInfo ? charityInfo.charity_icon : null;
    const charityLocation = charityInfo ? charityInfo.charity_location : null;
    const charityDescription = charityInfo ? charityInfo.charity_description : null;
    const charitySignUp = charityInfo ? charityInfo.charity_signup : null;
    const charityId = charityInfo ? charityInfo.id : null;

    // Handle Blog Posts
    const blogsPerPage = 3;

    const nextPage = () => {
        setBlogNumber(blogNumber -= blogsPerPage);
    };

    const prevPage = () => {
        setBlogNumber(blogNumber += blogsPerPage);
    };

    const charityBlogs = charityInfo.blogs;
    const numberBlogs = charityBlogs ? charityBlogs.length : 0;

    const sortBlogDate = charityBlogs ? 
        charityBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
        : null;
    
    const sliceBlogs = sortBlogDate ? 
        sortBlogDate.slice(blogNumber, blogNumber + blogsPerPage) 
        : null;

    const renderCharityBlogs = sliceBlogs ? 
        sliceBlogs.map((blog, index) => (
            <div key={index}>
                <BlogPosts 
                    blogImg={blog.cover_img} 
                    blogTitle={blog.blog_title} 
                    blogId={blog.id}
                    userLoggedIn={userLoggedIn}
                />
            </div>
        )) : null;

    // Calculate how much each specific charity has raised
    const specificCharityRaise = charityAmountsArray.filter(charity => charity.charity_id === (specificCharity ? specificCharity.id : null));
    const specificCharityAmount = specificCharityRaise.map(charity => charity.amount_raised);

    const donorsPerPage = 5;
    const allDonations = appData.donations;
    const setAllDonations = appData.setDonations;

    const moreDonors = () => {
        setDonorNumber(donorNumber += donorsPerPage);
    };

    const lessDonors = () => {
        setDonorNumber(donorNumber -= donorsPerPage);
    };

    const charityDonations = charityInfo.donations;
    const numberDonations = charityDonations ? charityDonations.length : 0;

    const sortedDonations = charityDonations ? 
        charityDonations.sort((a, b) => new Date(b.date_of_donation) - new Date(a.date_of_donation))
        : null;

    const sliceDonations = sortedDonations ? 
        sortedDonations.slice(0, donorNumber + donorsPerPage) 
        : null;

    const renderedDonors = sliceDonations ? 
        sliceDonations.map((donor, index) => (
            <div key={index}>
                <Donations 
                    donatedAmount={donor.amount_donated}
                    donationDate={donor.date_of_donation}
                    userId={donor.user_id}
                    userImg={donor.user.user_icon}
                    userName={donor.user.username}
                />
            </div>
        )) : null;

    const canDonate = donation ? 
        <button 
            className="cancelDonation"
            onClick={() => setDonation(false)}
        >
            Cancel Donation
        </button> : 
        <button 
            className="makeDonation"
            onClick={() => setDonation(true)}
        >
            Make Donation
        </button>;

    // Handle Reviews for charity
    const reviews = charityInfo.reviews;
    const reviewsPerPage = 5;

    const moreReviews = () => {
        setReviewNumber(reviewNumber += reviewsPerPage);
    };

    const lessReviews = () => {
        setReviewNumber(reviewNumber -= reviewsPerPage);
    };

    const allReviews = appData.reviews;
    const setAllReviews = appData.setReviews;

    const numberReviews = reviews ? reviews.length : null;
    const sortReviews = numberReviews ? 
        reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date)) : null;

    const sliceReviews = sortReviews ? 
        sortReviews.slice(0, reviewsPerPage + reviewNumber) : null;

    const renderReviewButtons = writeReview ? 
        <button 
            className="cancelReview"
            onClick={() => setWriteReview(false)}
        >
            Cancel Review
        </button> : 
        <button 
            className="writeReview"
            onClick={() => setWriteReview(true)}
        >
            Write Review
        </button>;

    const renderedReviews = sliceReviews ? 
        sliceReviews.map((charity, index) => (
            <div key={index}>
                <CharityReview 
                    userId={charity ? charity.user_id : null}
                    charityReview={charity.charity_review}
                    reviewDate={charity.review_date}
                    reviewTitle={charity.review_title}
                    reviewId={charity.id}
                    userName={charity.user.username}
                    userImg={charity.user.user_icon}
                    loggedUserId={loggedUserId}
                    allReviews={allReviews}
                    setAllReviews={setAllReviews}
                />
            </div>
        )) : null;

    return (
        <div className="mainContent">
            <CharityLogo 
                charityName={charityName}
                charityLogo={charityLogo}
                charityLocation={charityLocation}
                charityDescription={charityDescription}
                charitySignUp={charitySignUp}
                userLoggedIn={userLoggedIn}
                charityId={charityId}
                loggedInCharityId={loggedInCharityId}
            />

            <div className="charityBlogs">
                <h2 className="blogsHeader">{charityName} Published Blogs ({numberBlogs})</h2>
                <div className="charityBlogGrid">
                    {renderCharityBlogs}
                </div>
                <div className="blogToggleButtons">
                    {blogNumber === 0 ?
                        <button className="noPrevButton">
                            Recent Blogs
                        </button> :
                        <button 
                            className="recentButton"
                            onClick={nextPage}
                        >
                            Recent Blogs
                        </button>
                    }

                    {numberBlogs <= blogNumber + blogsPerPage ?
                        <button className="noNextButton">
                            Past Blogs
                        </button> :
                        <button 
                            className="previousButton"
                            onClick={prevPage}
                        >
                            Past Blogs
                        </button>
                    }
                </div>
            </div>

            <div className="charityDonations">
                <div className="charityDonationsHeader">
                    <h2 className="donorHeader">{charityName} has Received £{specificCharityAmount} so far from:</h2>
                    {userLoggedIn ? 
                        canDonate : 
                        null
                    }
                </div>
                {donation ? 
                    <div className="newDonor">
                        <NewDonation 
                            charityId={charityInfo.id}
                            allDonations={allDonations}
                            setAllDonations={setAllDonations}
                            setDonation={setDonation}
                        />
                    </div> : 
                    null
                }
                {renderedDonors}
                <div className="donorToggleButtons">
                    {donorNumber === 0 ?
                        <button className="noPrevButton">
                            Less Donors
                        </button> :
                        <button 
                            className="recentButton"
                            onClick={lessDonors}
                        >
                            Less Donors
                        </button>
                    }
                    {numberDonations <= donorNumber + donorsPerPage ?
                        <button className="noNextButton">
                            More Donors
                        </button> :
                        <button 
                            className="previousButton"
                            onClick={moreDonors}
                        >
                            More Donors
                        </button>
                    }
                </div>
            </div>

            <div className="charityReviews">
                <div className="reviewHeader">
                    <h2 className="reviewHeader">{charityName} has {numberReviews} Reviews</h2>
                    {userLoggedIn ? 
                        renderReviewButtons : 
                        null
                    }
                </div>
                {writeReview ? 
                    <div className="newReviewcontainer">
                        <NewReview 
                            allReviews={allReviews}
                            setAllReviews={setAllReviews}
                            charityId={charityInfo.id}
                        />
                    </div> : 
                    null
                }
                {renderedReviews}
                <div className="reviewToggleButtons">
                    {reviewNumber === 0 ?
                        <button className="noPrevButton">Less Reviews</button> :
                        <button 
                            className="recentButton"
                            onClick={lessReviews}
                        >
                            Less Reviews
                        </button>
                    }

                    {numberReviews <= reviewNumber + reviewsPerPage ?
                        <button className="noNextButton">More Reviews</button> :
                        <button
                            className="previousButton"
                            onClick={moreReviews}
                        >
                            More Reviews 
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
export default CharitiesPage;






