
import "./UserDonations.css"
import { Link } from "react-router-dom"

function UserDonations({
    charityImg,
    charityId
}){
    console.log(charityImg)
    return(
        <Link
            to={`/charities/${charityId}`}
        >
            <img 
                className="charityDonorImg" 
                src={charityImg}
                alt="charityDonorImg"
            />
        </Link>
    )
}
export default UserDonations

