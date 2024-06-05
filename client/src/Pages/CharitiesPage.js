import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import './CharitiesPage.css';

import CharityLogo from "../components/CharityPage/CharityLogo.js";
import Relations from "../components/CharityPage/Relations.js";
import Donations from "../components/CharityPage/Donations.js";
import BlogPosts from "../components/CharityPage/BlogPosts.js";

function CharitiesPage() {
  const appData = useOutletContext()
  const charities = appData.charities

  const params = useParams();
  const specificCharity = charities.find(charity => charity.id === parseInt(params.id));

  const [charityInfo, setCharityInfo] = useState({});
  const [donationInfo, setDonationInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [donate, setDonate] = useState(false)

  const itemsPerPage = 6;

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

  const donatedAmount = donationInfo.map((donor) => donor.amount_donated);
  const donatedSum = donatedAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const userInfo = donationInfo ? donationInfo.map((donorInfo) => donorInfo.user) : [];

  const charityBlogs = charityInfo.blogs ? charityInfo.blogs : [];

  const charityName = charityInfo ? charityInfo.charity_name : [];

  const charityIcon = charityInfo ? charityInfo.charity_icon : [];

  const charityDescription = charityInfo ? charityInfo.charity_description : [];

  const charityDate = charityInfo ? charityInfo.charity_signup : '';
  const formattedDate = charityDate ? charityDate.substring(0, 10) : '';

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonors = userInfo.slice(startIndex, endIndex);

  const donorInfo = currentDonors.map((user, index) => (
    <div key={index}>
      <Donations userImg={user.user_icon} userName={user.username} userId={user.id} donated={donatedAmount[startIndex + index].toFixed(2)} />
    </div>
  ));

  const blogInfo = charityBlogs.map((blog, index) => (
    <div key={index}>
      <BlogPosts blogImg={blog.cover_img} blogTitle={blog.blog_title} blog={blog}/>
    </div>
  ));

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < userInfo.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mainContent">
      <div className="mainInfo">
        <CharityLogo chairtyPic={charityIcon} charityLocation={charityInfo.charity_location} charityName={charityName} charityDescription={charityDescription} donate={donate} setDonate={setDonate} />
      </div>

      <div className="retlationHeader">
        <h1 className="relationTitle">{charityName} & Chari-Tea</h1>
        <Relations charityName={charityName} donatedAmount={donatedAmount} donatedSum={donatedSum} formattedDate={formattedDate} />
      </div>

      <>
        <div className="donationHeader">
          <h1>Donations</h1>
        </div>

        <div className="allDonationsGrid">
          {donorInfo}
          <div className="paginationButtons">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= userInfo.length}>Next</button>
          </div>
        </div>
      </>

      <>
        <h1>{charityName} Blog Posts</h1>
        <div className="blogGrid">
          {blogInfo}
        </div>
      </>
    </div>
  );
}

export default CharitiesPage;





