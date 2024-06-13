import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import './CharitiesPage.css';

import CharityLogo from "../components/CharityPage/CharityLogo.js";
import Relations from "../components/CharityPage/Relations.js";
import Donations from "../components/CharityPage/Donations.js";
import BlogPosts from "../components/CharityPage/BlogPosts.js";
import CharityReview from "../components/CharityPage/CharityReview.js";

function CharitiesPage() {
  const appData = useOutletContext()
  const charities = appData.charities

  const loggedInUser = appData.loggedInUser

  const loggedInCharity = appData.loggedInCharity

  const charityReviews = appData.reviews
  console.log(charityReviews)

  const params = useParams();
  const specificCharity = charities.find(charity => charity.id === parseInt(params.id));
  
  const charityId = specificCharity.id

  const [charityInfo, setCharityInfo] = useState({});
  const [donationInfo, setDonationInfo] = useState([]);
  const [donate, setDonate] = useState(false)
  const [allDonors, setAllDonors] = useState(false)
  const [writeReview, setWriteReview] = useState(false)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")


  const itemsPerPage = 6;

  const handleDonationClick = (e) => {
    e.preventDefault()
    setAllDonors(!allDonors)
  }

  useEffect(() => {
    if (specificCharity) {
      fetch(`http://127.0.0.1:5555/charities/${specificCharity.id}`)
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
          throw r;
        })
        .then((charityInfo) => {
          setCharityInfo(charityInfo);

          const donorInfo = charityInfo.donations ? charityInfo.donations : [];
          setDonationInfo(donorInfo);
        })
        .catch((error) => console.error("Error fetching charity info:", error));
    }
  }, [specificCharity]);

  console.log(specificCharity)


  const donatedAmount = donationInfo.map((donor) => donor.amount_donated);
  const donatedSum = donatedAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


  const charityBlogs = charityInfo.blogs ? charityInfo.blogs : [];

  const charityName = charityInfo ? charityInfo.charity_name : [];

  const charityIcon = charityInfo ? charityInfo.charity_icon : [];

  const charityDescription = charityInfo ? charityInfo.charity_description : [];

  const charityDate = charityInfo ? charityInfo.charity_signup : '';
  const formattedDate = charityDate ? charityDate.substring(0, 10) : '';

  const donationInfoCopy = donationInfo.slice()
  const sortDonationInfoDesc = donationInfoCopy.sort((a, b) => new Date(b.date_of_donation) - new Date(a.date_of_donation))


  const allDonorInfo = sortDonationInfoDesc.map((donor, index) => (
    <div key={index}>
      <Donations 
        dateOfDonation={donor.date_of_donation}
        userImg={donor.user.user_icon}
        userId={donor.user.id}
        donated={donor.amount_donated.toFixed(2)}
        userName={donor.user.username}
        allDonors={allDonors}
        setAllDonors={setAllDonors}
      />
    </div>
  ));

  const mosetRecentDonors = sortDonationInfoDesc.slice(0, itemsPerPage)

  const filteredDonorInfo = mosetRecentDonors.map((donor, index) => (
    <div key={index}>
      <Donations 
        dateOfDonation={donor.date_of_donation}
        userImg={donor.user.user_icon}
        userId={donor.user.id}
        donated={donor.amount_donated.toFixed(2)}
        userName={donor.user.username}
        allDonors={allDonors}
        setAllDonors={setAllDonors}
      />
    </div>
  ))


  const blogInfo = charityBlogs.map((blog, index) => (
    <div key={index}>
      <BlogPosts blogImg={blog.cover_img} blogTitle={blog.blog_title} blog={blog}/>
    </div>
  ));

  const relevantReviews = charityReviews.filter(review => review.charity_id == specificCharity.id)

  const sortReviewDates = relevantReviews.sort((a, b) => new Date(b.review_date) - (a.review_date))
  
  const specificCharityReview = sortReviewDates.map((review, index) => (
    <div key={index}>
      <CharityReview 
        review={review} 
        loggedInUser={loggedInUser}
        reviewTitle = {reviewTitle}
        setReviewTitle={setReviewTitle}
        reviewContent={reviewContent}
        setReviewContent={setReviewContent}
      />
    </div>
  ))


  return (
    <div className="mainContent">
      <div className="mainInfo">
        <CharityLogo 
          chairtyPic={charityIcon}    
          charityLocation={charityInfo.charity_location} 
          charityName={charityName} 
          charityDescription={charityDescription} 
          donate={donate} 
          setDonate={setDonate} 
          charityId={charityId} 
          loggedInUser={loggedInUser}
          loggedInCharity={loggedInCharity}
          writeReview = {writeReview}
          setWriteReview = {setWriteReview}
          reviewTitle = {reviewTitle}
          setReviewTitle = {setReviewTitle}
          reviewContent = {reviewContent}
          setReviewContent = {setReviewContent}
        />
      </div>

      <div className="retlationHeader">
        <h1 className="relationTitle">{charityName} & Chari-Tea</h1>
        <Relations charityName={charityName} donatedAmount={donatedAmount} donatedSum={donatedSum} formattedDate={formattedDate} />
      </div>

      <>
        <div className="donationHeader">
          <h1>Donations</h1>
        </div>
        {allDonors? allDonorInfo : filteredDonorInfo}
        <button 
          className="donorInfoShow"
          onClick={handleDonationClick}
        >
          {allDonors? "Show Most Recent Donations" : "Show All Donations"}
        </button>
      </>

      <>
        <h1>{charityName} Blog Posts</h1>
        <div className="blogGrid">
          {blogInfo}
        </div>
      </>

      <>
        <div className="reviewsHeader">
          <h1>{charityName} Reviews</h1>
        </div>
        {specificCharityReview}
      </>
    </div>
  );
}

export default CharitiesPage;





