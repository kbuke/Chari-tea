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
    const [editProgress, setEditProgress] = useState(false)
    const [editedHeader, setUpdatedHeader] = useState()
    const [editedContent, setEditedContent] = useState()


    const handleContentEdit = (e) => {
      e.preventDefault()
      setEditedContent(e.target.value)
    }

    const blogUserId = appData.loggedInUser.id
    const blogCharityId = appData.loggedInCharity.id

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

    const currentTitle = specificBlog.blog_title
    const currentContent = specificBlog.blog_content

    console.log(editedContent)
    console.log(currentContent)


    const HandleEdit = () => {
        fetch(`/blogs/${specificBlog.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            blog_title: editedHeader? editedHeader : currentTitle,
            blog_content: editedContent? editedContent : currentContent
          })
        })
        .then((r) => {
          if(r.ok) {
            console.log("Blog Updated")
          } else {
            console.error("Failed to update blog")
          }
        })
        .catch((error) => {
          console.error("Error", error)
        })
      }

    return(
        <div className="blogPostContainer">
            <BlogPostHeader 
              blogInfo={blogInfo} 
              blogUserId={blogUserId} 
              handleEdit={HandleEdit}
              setUpdatedHeader = {setUpdatedHeader}
              currentTitle = {currentTitle}
              editProgress = {editProgress}
              setEditProgress={setEditProgress}
              blogCharityId={blogCharityId}
            />
            {editProgress? 
              <textarea className="editContentText" onChange={handleContentEdit}>
                {currentContent}
              </textarea>
              :
              <div className="blogContent">
                {blogInfo.blog_content && blogInfo.blog_content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            }
        </div>
    )
}

export default BlogPost