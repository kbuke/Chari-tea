import "./BlogPostHeader.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BlogPostHeader({ blogInfo, blogUserId }) {

    const navigate = useNavigate()

    const publishUserId = blogInfo.user_id

    const publishedDate = blogInfo.blog_date;
    const blogTitle = blogInfo.blog_title;
    const blogViews = blogInfo.blog_views;
    const blogId = blogInfo.id

    const userBlog = blogInfo.user;
    const charityBlog = blogInfo.charity;

    const profilePic = userBlog?.user_icon || charityBlog?.charity_icon;
    const profileLink = userBlog ? `/users/${userBlog.id}` : `/charities/${charityBlog?.id}`;

    const handleDelete = (e) => {
        e.preventDefault();

        fetch(`/blogs/${blogId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                navigate(`/users/${publishUserId}`)
                // Handle successful deletion
                console.log('Blog deleted successfully');
            } else {
                // Handle errors
                console.error('Failed to delete the blog');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <div className="blogHeading">
            <h1 className="blogTitle">{blogTitle}</h1>
            <div className="subHeaderGrid">
                <h3>Published: {publishedDate}</h3>
                <Link to={profileLink}>
                    <img className="blogAuthorImg" src={profilePic} alt="Profile" />
                </Link>
                <h3>{blogViews} Views 👀</h3>
            </div>
            {publishUserId == blogUserId ? 
                <button className="deleteUserBlog" onClick={handleDelete}>
                    Delete Blog
                </button>
                :
                null
            }
        </div>
    );
}

export default BlogPostHeader;