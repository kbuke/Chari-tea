import "./UserInfo.css"

function UserInfo({userImg, userName}){
    return(
        <div className="userInfoGrid">
            <div className="userImgContainer">
                <img className="userImg" src={userImg}/>
            </div>

            <div className="userContainer">
                <h1 className="userName">{userName}</h1>
            </div>
        </div>
    )
}
export default UserInfo