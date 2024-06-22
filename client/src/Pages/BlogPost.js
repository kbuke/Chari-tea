import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";

import "./BlogPost.css";

import BlogPostHeader from "../components/Blogs/BlogPostHeader.js";
import AuthorButtons from "../components/Blogs/AuthorButtons.js";
import BlogContent from "../components/Blogs/BlogContent.js";
import EditBlog from "../components/Blogs/EditBlog.js";

function BlogPost() {
  const appData = useOutletContext();
  const params = useParams();

  const [blogInfo, setBlogInfo] = useState([]);
  const [editBlog, setEditBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);

  const allBlogs = appData.blogs;
  const setAllBlogs = appData.setBlogs;

  const userLoggedIn = appData.userLoggedIn;
  const charityLoggedIn = appData.charityLoggedIn;

  const loggedUser = appData.user;
  const loggedCharity = appData.charity;

  const specificBlog = allBlogs.find((blog) => blog.id === parseInt(params.id));

  useEffect(() => {
    if (specificBlog) {
      fetch(`/blogs/${specificBlog.id}`)
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
          throw r;
        })
        .then((blogInfo) => {
          setBlogInfo(blogInfo);
        })
        .catch((error) => console.error("Error fetching charity info:", error));
    }
  }, [specificBlog]);

  console.log(specificBlog);

  //Get info for blog header
  const blogTitle = specificBlog?.blog_title || null;
  const blogDate = specificBlog?.blog_date || null;
  const blogViews = specificBlog?.blog_views || null;
  const blogId = specificBlog?.id || null;

  const authorId = specificBlog?.user_id ?? specificBlog?.charity_id;

  const authorImg =
    specificBlog?.user?.user_icon ?? specificBlog?.charity?.charity_icon;

  const authorName =
    specificBlog?.user?.username ?? specificBlog?.charity?.charity_name;

  //Handle Blog Content Info
  const blogContent = specificBlog?.blog_content || null;

  const [editBlogTitle, setEditBlogTitle] = useState(blogTitle);
  const [editBlogContext, setEditBlogContext] = useState(blogContent);

  const renderBlog = (
    <BlogContent
      blogContent={blogContent}
      blogTitle={blogTitle}
      authorName={authorName}
    />
  );

  const editBlogComp = (
    <EditBlog
      blogTitle={blogTitle}
      blogContent={blogContent}
      allBlogs={allBlogs}
      setAllBlogs={setAllBlogs}
      setEditBlogTitle={setEditBlogTitle}
      setEditBlogContext={setEditBlogContext}
    />
  );

  console.log(loggedCharity);
  console.log(loggedUser);

  const userBlogs = loggedUser ? loggedUser.blogs : null;
  const userBlogTitles = userBlogs
    ? userBlogs.map((blog) => blog.blog_title)
    : null;
  const specificUserBlogTitle = userBlogTitles
    ? userBlogTitles.filter((blog) => blog === blogTitle)
    : null;

  const charityBlogs = loggedCharity ? loggedCharity.blogs : null;
  const charityBlogTitles = charityBlogs
    ? charityBlogs.map((blog) => blog.blog_title)
    : null;
  const specificCharityBlogTitle = charityBlogTitles
    ? charityBlogTitles.filter((blog) => blog === blogTitle)
    : null;

  //Handle logic for author buttons
  const authorButtons =
    (loggedUser &&
      loggedUser.id === authorId &&
      specificUserBlogTitle &&
      specificUserBlogTitle[0] === blogTitle) ||
    (loggedCharity &&
      loggedCharity.id === authorId &&
      specificCharityBlogTitle &&
      specificCharityBlogTitle[0] === blogTitle) ? (
      <AuthorButtons
        editBlog={editBlog}
        setEditBlog={setEditBlog}
        deleteBlog={deleteBlog}
        setDeleteBlog={setDeleteBlog}
        allBlogs={allBlogs}
        setAllBlogs={setAllBlogs}
        blogId={specificBlog.id}
        editBlogTitle={editBlogTitle}
        editBlogContext={editBlogContext}
        userLoggedIn={userLoggedIn}
        authorId={authorId}
      />
    ) : null;

  console.log(allBlogs);
  console.log(setAllBlogs);

  return (
    <div className="blogPostContainer">
      <BlogPostHeader
        specificBlog={specificBlog}
        blogDate={blogDate}
        blogViews={blogViews}
        blogId={blogId}
        authorId={authorId}
        authorImg={authorImg}
      />
      {authorButtons}
      {editBlog ? editBlogComp : renderBlog}
    </div>
  );
}

export default BlogPost;