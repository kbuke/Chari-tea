import "./BlogPosts.css"
import { Link } from "react-router-dom"

function BlogPosts({blogImg, blogTitle, blog}){
    return(
        <div className="charityBlogContainer">
            <Link
                to={`/blogpost/${blog.id}`}
            >
                <img className="blogImg" src={blogImg}/>
                <h3 className="blogTitle">{blogTitle}</h3>
            </Link>
        </div>
    )
}
export default BlogPosts