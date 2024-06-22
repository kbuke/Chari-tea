import "./RenderedUsers.css";
import { Link } from "react-router-dom";

function RenderedUsers({
    userId,
    userImg,
    userName,
    hoveredUserId,
    setHoveredUserId,
    setSelectUser
}) {
    const hoverTrue = () => {
        setHoveredUserId(userId);
    };

    const hoverFalse = () => {
        setHoveredUserId(null);
    };

    const turnOffUser = () => {
        setSelectUser(false)
    }

    return (
        <div className="userHomeImgContainer">
            <Link 
                to={`/users/${userId}`}
                onClick={turnOffUser}
            >
                {hoveredUserId === userId ? (
                    <img
                        className="hoverImg"
                        src={userImg}
                        onMouseLeave={hoverFalse}
                        alt="userProfileImg"
                    />
                ) : (
                    <img
                        className="noHover"
                        src={userImg}
                        onMouseEnter={hoverTrue}
                        alt="userProfileImg"
                    />
                )}
                <h2>{userName}</h2>
            </Link>
        </div>
    );
}

export default RenderedUsers;