import "./BlogPosts.css"
import { Link } from "react-router-dom"

function BlogPosts({
    blogImg,
    blogTitle,
    blogId
}){
    return(
        <div className="charityBlogContainer">
            <Link
                to={`/blogpost/${blogId}`}
            >
                <img 
                    className="blogImg" 
                    src={blogImg}
                    alt="blogImage"
                />
                <h3 className="blogTitle">{blogTitle}</h3>
            </Link>
        </div>
    )
}
export default BlogPosts
