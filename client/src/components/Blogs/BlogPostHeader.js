import "./BlogPostHeader.css";
import { Link } from "react-router-dom";

function BlogPostHeader({ blogInfo }) {
    const publishedDate = blogInfo.blog_date;
    const blogTitle = blogInfo.blog_title;
    const blogViews = blogInfo.blog_views;

    const userBlog = blogInfo.user;
    const charityBlog = blogInfo.charity;

    const profilePic = userBlog?.user_icon || charityBlog?.charity_icon;
    const profileLink = userBlog ? `/users/${userBlog.id}` : `/charities/${charityBlog?.id}`;

    console.log(profileLink);
    console.log(profilePic);

    return (
        <>
            <h1 className="blogTitle">{blogTitle}</h1>
            <div className="subHeaderGrid">
                <h3>Published: {publishedDate}</h3>
                <Link to={profileLink}>
                    <img className="blogAuthorImg" src={profilePic} alt="Profile" />
                </Link>
                <h3>{blogViews} Views 👀</h3>
            </div>
        </>
    );
}

export default BlogPostHeader;