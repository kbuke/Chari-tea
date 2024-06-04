import { Link } from "react-router-dom/cjs/react-router-dom.min"

import "./UserBlogs.css"


function UserBlogs({blogImg, blogTitle, blogId}){
    return(
        <div className="usersBlogContainer">
            <Link
                to={`/blogpost/${blogId}`}
            >
                <img className="blogImg" src={blogImg}/>
                <h3 className="blogTitle">{blogTitle}</h3>
            </Link>
        </div>
    )
}
export default UserBlogs