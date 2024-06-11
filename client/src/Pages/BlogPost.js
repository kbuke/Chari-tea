import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useOutletContext } from "react-router-dom"

import "./BlogPost.css"

import BlogPostHeader from "../components/Blogs/BlogPostHeader.js"

function BlogPost(){
    const appData = useOutletContext()
    const blogs = appData.blogs
    
    const params = useParams()
    const specificBlog = blogs.find(blog => blog.id === parseInt(params.id))

    const [blogInfo, setBlogInfo] = useState([])

    const blogUserId = appData.loggedInUser.id

    useEffect(() => {
        if (specificBlog) {
          fetch(`http://127.0.0.1:5555/blogs/${specificBlog.id}`)
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

    return(
        <div className="blogPostContainer">
            <BlogPostHeader blogInfo={blogInfo} blogUserId={blogUserId}/>
            <div className="blogContent">
                {blogInfo.blog_content && blogInfo.blog_content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    )
}

export default BlogPost