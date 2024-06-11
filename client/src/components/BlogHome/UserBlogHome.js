import "./UserBlogHome.css"
import { Link } from "react-router-dom";

function UserBlogHome({
    userBlogs,
    setBlogLink
}){
    console.log(userBlogs)
    return(
        <div className="userBlogHomeGrid">
            <div className="userBlogHomeContainer">
                <Link
                    to={`/blogpost/${userBlogs.id}`}
                    onClick={setBlogLink(false)}
                >
                    <img src={userBlogs.cover_img} className="userHomeImg"/>
                    <h4 className="userBlogHomeTitle">{userBlogs.blog_title}</h4>
                </Link>
                <div className="userBlogHomeInfo">
                    <Link
                        to={`/users/${userBlogs.user.id}`}
                        onClick={setBlogLink(false)}
                    >
                        <img className="userImgBlogHome" src={userBlogs.user.user_icon}/>
                    </Link>
                    <h5 className="userHomePublishedBlog">{userBlogs.blog_date}</h5>
                    <h4 className="userHomeBlogViews">{userBlogs.blog_views} 👀</h4>
                </div>
            </div>
        </div>
    )
}
export default UserBlogHome