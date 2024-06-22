
import { Link } from "react-router-dom"

import "./UserBlogs.css"


function UserBlogs({blogImg, blogTitle, blogId}){
    return(
        <div className="userBlogContainers">
            <Link
                to={`/blogpost/${blogId}`}
            >
                <img 
                    className="blogImg" 
                    src={blogImg}
                    alt="userBlogAccount"
                />
                <h3 className="blogTitle">{blogTitle}</h3>
            </Link>
        </div>
    )
}
export default UserBlogs