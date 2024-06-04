import { Link } from "react-router-dom"
import "./RenderedUsersBlogs.css"

function RenderedUsersBlogs({blogs}){
    return(
        <>
            <Link
                to={`blogpost/${blogs.id}`}
            >
                <div className="homePgUserBlogImgContainer">
                    <img className="homePgUserBlogImg" src={blogs.cover_img}/>
                    <div className="homePageUserBlogTitleContainer">
                        <h3 className="homePageUserBlogTitle">{blogs.blog_title}</h3>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default RenderedUsersBlogs