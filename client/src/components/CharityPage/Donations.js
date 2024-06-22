import { Link } from "react-router-dom";
import './Donations.css'

function Donations({
    donatedAmount,
    donationDate,
    userId,
    userImg,
    userName
}){
    return(
        <div className="charityDonationsBlog">
            <div className="donationInfoGrid">
                <div className="donorInfo">
                    <Link
                        to={`/users/${userId}`}
                    >
                        <img className="donorImg" src={userImg}/>
                    </Link>
                    <h3>{userName} Donated £{donatedAmount}</h3>
                    <h6>{donationDate}</h6>
                </div>
            </div>
        </div>
    )
}
export default Donations


