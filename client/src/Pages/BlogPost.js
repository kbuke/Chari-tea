import { useState, useEffect } from "react"
import { useParams } from "react-router"

import "./BlogPost.css"

import BlogPostHeader from "../components/Blogs/BlogPostHeader.js"


function BlogPost({blogs}){
    const params = useParams()
    const specificBlog = blogs.find(blog => blog.id === parseInt(params.id))

    const [blogInfo, setBlogInfo] = useState([])

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
            <BlogPostHeader blogInfo={blogInfo}/>
        </div>
    )
    
}
export default BlogPost