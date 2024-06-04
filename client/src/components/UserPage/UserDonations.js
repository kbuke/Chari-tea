import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./UserDonations.css"

function UserDonations({charityImg, charityId}){
    console.log(charityImg)
    return(
        <Link 
            className="userCharityGrid"
            to={`/charities/${charityId}`}
        >
            <div className="userCharityImageContainer">
                <img className="charityLogo" src={charityImg}/>
            </div>
        </Link>
    )
}
export default UserDonations