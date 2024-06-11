import { Link } from "react-router-dom";
import './Donations.css'

function Donations({ 
  userImg,
  userName, 
  userId, 
  donated,
  dateOfDonation,
  allDonors,
  setAllDonors
}) {

    return (
      <div className="charityDonationsBlog">
          <div className="donationInfoGrid">
            <div className="donorInfo">
              <Link to={`/users/${userId}`}>
                <img src={userImg} className="donorImg"/>
              </Link>
              <h3>{userName} Donated £{donated}</h3>
              <h6>{dateOfDonation}</h6>
            </div>
          </div>
      </div>
    );
  }
  
  export default Donations;


