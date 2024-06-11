import "./UserInfo.css"
import { useNavigate } from "react-router-dom"

function UserInfo({userImg, userName, userCheck}){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/newblog")
    }

    return(
        <div className="userInfoGrid">
            <img className="userImg" src={userImg}/>
            <h1>{userName}</h1>
            {userCheck? 
                <div className="ownUserButtons">
                    <button className="userBlogCreate" onClick={handleClick}>Create a New Blog</button>
                </div>
                :
                null
            }
        </div>
    )
}
export default UserInfo