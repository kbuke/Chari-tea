import "./UserInfo.css"
import { useNavigate } from "react-router-dom"

function UserInfo({
    userImg,
    userName,
    userSignUpDate,
    userEmail,
    loggedInUserId,
    userId
}){
    const navigate = useNavigate()

    const navBlog = () => {
        navigate('/newblog')
    }

    const userSignUp = userSignUpDate ? 
        userSignUpDate.slice(0, 10)
        :
        null 
    
    const writeUserBlog = loggedInUserId == userId ?
        <button 
            className="writeUserBlog"
            onClick={navBlog}
        >
            Write New Blog
        </button>
        :
        null 

    return(
        <div className="userLogoContainer">
            <img className="userPgLogo" src={userImg}/>
            <h1 className="userPgName">{userName}</h1>
            <h2 className="userEmail">{userEmail}</h2>
            <h3 className="userSignUpDate">Joined: {userSignUp}</h3>
            {writeUserBlog}
        </div>
    )
}
export default UserInfo

