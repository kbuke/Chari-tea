import "./UserBlogs.css"
import { Link } from "react-router-dom"

function UserBlogs({
    blogId,
    blogTitle,
    blogViews,
    blogImg,
    blogDate,
    userId,
    userImg,
    handleBlogSelect
}){
    const slicedDate = blogDate ? 
        blogDate.slice(0, 10)
        :
        null

    return(
        <div className="blogCard">
            <Link
                to={`/blogpost/${blogId}`}
                onClick={handleBlogSelect}
            >
                <img 
                    className="blogImgCard" 
                    src={blogImg}
                    alt="userBlogCard"
                />
                <h2>{blogTitle}</h2>
            </Link>
            <div className="blogInfoGrid">
                <h6>{blogViews} 👁️</h6>
                <Link
                    to={`/users/${userId}`}
                    onClick={handleBlogSelect}
                >
                    <img className="userBlogInfoImg" src={userImg}/>
                </Link>
                <h6>{slicedDate}</h6>
            </div>
        </div>
    )
}
export default UserBlogs