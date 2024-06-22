import "./UserBlogs.css"
import { Link } from "react-router-dom"

function CharityBlogs({
    blogId,
    blogName,
    blogDate,
    blogViews,
    blogImg,
    charityId,
    charityImg,
    handleBlogSelect
}){
    const sliceDate = blogDate ? 
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
                    alt="blogCard"
                />
                <h2>{blogName}</h2>
            </Link>
            <div className="blogInfoGrid">
                <h6>{blogViews} 👁️</h6>
                <Link
                    to={`/charities/${charityId}`}
                    onClick={handleBlogSelect}
                >
                    <img 
                        className="charityBlogInfoImg" 
                        src={charityImg}
                        alt=""
                    />
                </Link>
                <h6>{sliceDate}</h6>
            </div>
        </div>
    )
}
export default CharityBlogs