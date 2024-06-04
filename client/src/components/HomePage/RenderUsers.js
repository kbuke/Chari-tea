import { Link } from "react-router-dom"

import "./RenderUsers.css"

function RenderUsers({users}){
    return(
        <>
            <Link
                to={`users/${users.id}`}
            >
                <div className="homePgUserImgContainer">
                    <img className="homePgUserImg" src={users.user_icon}/>
                </div>
            </Link>
        </>
    )
}
export default RenderUsers