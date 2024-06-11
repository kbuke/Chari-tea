import "./UserLinks.css"
import { Link } from "react-router-dom"

function UserLinks({
    userImg, 
    userName, 
    userId,
    setUserLink
}){
    console.log(userId)
    return(
        <Link
            className="usersContainer"
            to={`/users/${userId}`}
            onClick={() => setUserLink(false)}
        >
            <img className="userImgHome" src={userImg}/>
            <h2 className="userImgName">{userName}</h2>
        </Link>
    )
}
export default UserLinks