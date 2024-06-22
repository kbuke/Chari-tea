import React, { useEffect } from "react";
import "./BlogPostHeader.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BlogPostHeader({
    specificBlog,
    blogId, 
    blogDate,
    blogViews,
    authorId,
    authorImg,
}){

    //Increase blog count by 1 every time user opens page
    useEffect(() => {
        fetch(`/blogs/${blogId}/increment-views`, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to increment the blog views');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);
        
    
    return(
        <div className="blogHeading">
            <div className="blogHeadingGrid">
                <h3>Published: {blogDate}</h3>
                <>
                    <Link
                        to={specificBlog?.user ?
                            `/users/${authorId}`
                            :
                            `/charities/${authorId}`
                        }
                    >
                        <img 
                            className="blogAuthorImg" 
                            src={authorImg}
                            alt="blogImage"
                        />
                    </Link>
                </>
                <h3>{blogViews} 👀</h3>
            </div>
        </div>
    )
}
export default BlogPostHeader

// function BlogPostHeader({ 
//     blogInfo, 
//     blogUserId,
//     handleEdit,
//     setUpdatedHeader,
//     currentTitle,
//     editProgress,
//     setEditProgress,
//     blogCharityId,
//     blogs,
//     setBlogs
// }) {

//     const navigate = useNavigate();

//     const publishUserId = blogInfo.user_id;
//     const publishCharityId = blogInfo.charity_id;

//     const publishedDate = blogInfo.blog_date;
//     const blogTitle = blogInfo.blog_title;
//     const blogViews = blogInfo.blog_views;
//     const blogId = blogInfo.id;

//     const userBlog = blogInfo.user;
//     const charityBlog = blogInfo.charity;

//     const profilePic = userBlog?.user_icon || charityBlog?.charity_icon;
//     const profileLink = userBlog ? `/users/${userBlog.id}` : `/charities/${charityBlog?.id}`;

//     const onDelete = (blogId) => {
//         const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
//         setBlogs(updatedBlogs);
//     };

//     const turnEditOn = (e) => {
//         e.preventDefault();
//         setEditProgress(true);
//     };

//     const turnEditOff = (e) => {
//         e.preventDefault();
//         setEditProgress(false);
//     };

//     const updatedHeader = (e) => {
//         e.preventDefault();
//         setUpdatedHeader(e.target.value);
//     };

//     const handleDelete = (e) => {
//         e.preventDefault();

//         fetch(`/blogs/${blogId}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (response.ok) {
//                 navigate(`/users/${publishUserId}`);
//                 // Handle successful deletion
//                 console.log('Blog deleted successfully');
//                 onDelete(blogId);
//             } else {
//                 // Handle errors
//                 console.error('Failed to delete the blog');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     };

//     useEffect(() => {
//         // Increment blog views by 1
//         fetch(`/blogs/${blogId}/increment-views`, {
//             method: 'POST'
//         })
//         .then(response => {
//             if (!response.ok) {
//                 console.error('Failed to increment the blog views');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }, [blogId]);

//     return (
//         <div className="blogHeading">
//             {editProgress ? 
//                 <textarea onChange={updatedHeader} className="updateHeaderText">
//                     {currentTitle}
//                 </textarea>
//                 :
//                 <h1 className="blogTitle">{blogTitle}</h1>
//             }
//             <div className="subHeaderGrid">
//                 <h3>Published: {publishedDate}</h3>
//                 <Link to={profileLink}>
//                     <img className="blogAuthorImg" src={profilePic} alt="Profile" />
//                 </Link>
//                 <h3>{blogViews} Views 👀</h3>
//             </div>
//             {(publishUserId === blogUserId || (publishCharityId && blogCharityId && publishCharityId === blogCharityId)) ?  
//                 <div>
//                     {editProgress ?
//                         <div> 
//                             <button className="stopEditButton" onClick={turnEditOff}>Cancel Edit</button>
//                             <button className="submitEditBlog" onClick={handleEdit}>Submit Edit</button>
//                         </div>
//                         :
//                         <>
//                             <button className="deleteUserBlog" onClick={handleDelete}>
//                                 Delete Blog
//                             </button>

//                             <button 
//                                 className="editUserBlog"
//                                 onClick={turnEditOn}
//                             >
//                                 Edit Blog
//                             </button>
//                         </>
//                     }
//                 </div>
//                 :
//                 null
//             }
//         </div>
//     );
// }

// export default BlogPostHeader;