import "./AuthorButton.css"
import { useNavigate } from "react-router-dom"

function AuthorButtons({
    editBlog,
    setEditBlog,
    deleteBlog,
    setDeleteBlog,
    allBlogs,
    setAllBlogs,
    blogId,
    editBlogTitle,
    editBlogContext,
    userLoggedIn,
    authorId
}){
    console.log(editBlogTitle)
    console.log(editBlogContext)

    const navigate = useNavigate()

    //Handle deleting blog
    const handleDelete = () => {
      fetch(`/blogs/${blogId}`, {
        method: "DELETE"  
      })
      .then((r) => {
        if(r.ok){
          setAllBlogs((blogs) => 
            blogs.filter((blog) => blog.id !== blogId))
          {userLoggedIn ? 
            navigate(`/users/${authorId}`)
            :
            navigate(`/charities/${authorId}`)
          }
        }
      })
    }

    //Handle editing blog
    const handleEdit = () => {
      fetch(`/blogs/${blogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          blog_title: editBlogTitle,
          blog_content: editBlogContext
        })
      })
      .then((r) => {
        if(r.ok) {
          return r.json()
        } else {
          console.error("Failed to update review")
        }
      })
      .then((newBlog) => 
        setAllBlogs(allBlogs.map(oldBlogs => 
          oldBlogs.id === newBlog.id ? newBlog : oldBlogs)))
        window.location.reload();
    }


    const authorButtonChoice = (!editBlog && !deleteBlog ?
      <div className="authorButtonContainer">
        <button
          className="editBlogButton"
          onClick={() => setEditBlog(!editBlog)}
        >
          Edit Blog
        </button>

        <button
          className="deleteBlogButton"
          onClick={() => setDeleteBlog(!deleteBlog)}
        >
          Delete Blog
        </button>
      </div>
      :
      (editBlog && !deleteBlog ?
        <div className="authorButtonContainer">
          <button 
            className="canEditBlog"
            onClick={() => setEditBlog(!editBlog)}
          >
            Cancel Edit
          </button>
          <button
            className="subEditBlog"
            onClick={handleEdit}
          >Submit Edit</button>
        </div>
        :
        (!editBlog && deleteBlog ?
          <div className="authorButtonContainer">
            <button
              className="canDelBlog"
              onClick={() => setDeleteBlog(!deleteBlog)}
            >
              Cancel Deletion
            </button>
            <button
              className="subDelBlog"
              onClick={handleDelete}
            >
              Submit Deletion
            </button>
          </div>
          :
          null
        )
      )
    )

    return(
        <div>
            {authorButtonChoice}
        </div>
    )
}
export default AuthorButtons