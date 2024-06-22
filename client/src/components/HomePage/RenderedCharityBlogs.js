
import "./RenderedCharityBlogs.css"
import { Link } from "react-router-dom"

function RenderedCharityBlogs({blogs}){
    return(
        <div className="homePageCharityBlogContainer">
            <Link
                to={`/blogpost/${blogs.id}`}
            >
                <img src={blogs.cover_img} className="homePageBlogImg"/>
                <div className="homePageBlogTitleContainer">
                    <h3 className="homePageBlogTitle">{blogs.blog_title}</h3>
                </div>
            </Link>
        </div>
    )
}
export default RenderedCharityBlogs