import "./CharityBlogHome.css"
import { Link } from "react-router-dom";


function CharityBlogHome({charityBlogs}){

    return(
        <div className="charityBlogHomeGrid">
            <div className="charityBlogHomeContainer">
                <Link
                    to={`/blogpost/${charityBlogs.id}`}
                >
                    <img src={charityBlogs.cover_img} className="charityHomeImg"/>
                    <h4 className="charityBlogHomeTilte">{charityBlogs.blog_title}</h4>
                </Link>
                <div className="charityBlogHomeInfo">
                    <Link
                        to={`/charities/${charityBlogs.charity.id}`}
                    >
                        <img className="charityImgBlogHome" src={charityBlogs.charity.charity_icon}/>
                    </Link>
                    <h5 className="charityHomePublishedBlog">{charityBlogs.blog_date}</h5>
                    <h4 className="charityHomeBlogViews">{charityBlogs.blog_views} 👀</h4>
                </div>
            </div>
        </div>
    )
}
export default CharityBlogHome