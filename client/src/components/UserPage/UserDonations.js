
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
            <img className="charityDonorImg" src={charityImg}/>
        </Link>
    )
}
export default UserDonations

// function UserDonations({charityImg, charityId}){
//     console.log(charityImg)

//     return(
//         <>
//             <>
//                 <Link 
//                     className="userCharityGrid"
//                     to={`/charities/${charityId}`}
//                 >
//                     <div className="userCharityImageContainer">
//                         <img className="charityLogo" src={charityImg}/>
//                     </div>
//                 </Link>
//             </>
//         </>
//     )
// }
// export default UserDonations