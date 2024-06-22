import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react"
import "./NewBlog.css"

function NewBlog(){
    const appData = useOutletContext()
    const navigate = useNavigate()

    //Get all blogs made
    const allBlogs = appData.blogs 
    const setAllBlogs = appData.setBlogs

    //Set State
    const [blogTitle, setBlogTitle] = useState("")
    const [blogContext, setBlogContext] = useState("")
    const [blogImg, setBlogImg] = useState("")
    const [active, setActive] = useState(false)

    //See if user is logged in
    const userLoggedIn = appData.userLoggedIn

    //Get info on logged in user
    const loggedInUser = appData.user
    const loggedInUserId = loggedInUser? loggedInUser.id : null 

    //See if charity is logged in
    const charityLoggedIn = appData.charityLoggedIn

    const loggedInCharity = appData.charity 
    const loggedInCharityId = loggedInCharity ? loggedInCharity.id : null

    //Create methods to alter state
    const handleTitleChange = (e) => {
        e.preventDefault()
        setBlogTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        e.preventDefault()
        setBlogContext(e.target.value)
    }

    const handleImgChange = (e) => {
        e.preventDefault()
        setBlogImg(e.target.value)
    }

    const handleActive = () => {
        setActive(true)
    }

    const activeOff = () => {
        setActive(false)
    }

    //Sort information
    const jsonData = (userLoggedIn || charityLoggedIn) ?
        {
            blog_title: blogTitle,
            blog_content: blogContext,
            cover_img: blogImg
        }
        :
        {

        }

    //Handle new blog submit 
    const handleNewBlog = (e) => {
        e.preventDefault()
        fetch("/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then((r) => {
            return r.json()
        })
        .then((newBlog) => {
            console.log(newBlog)
            setAllBlogs([...allBlogs, newBlog])
        })
        if (loggedInUser) {
            navigate(`/users/${loggedInUserId}`)
        } else {
            navigate(`/charities/${loggedInCharityId}`)
        }
    }

    return (
        <form className="newBlogPost" onSubmit={handleNewBlog}>
            <h1 className="newBlogPageHeader">New Blog Post</h1>
            <br/>
        
            <input 
                type="text"
                className="newBlogTitle"
                placeholder="Enter Blog Title"
                onClick={activeOff}
                onChange={handleTitleChange}
            />
            <br/>
        
            <input 
                type="text"
                className="newBlogImg"
                placeholder="Enter Blog Image"
                onClick={activeOff}
                onChange={handleImgChange}
            />
            <br/>
        
            <textarea 
                className={active ? "writeContent" : "newBlogContent"}
                placeholder="Enter Blog Content"
                onClick={handleActive}
                onChange={handleContentChange}
                rows="10"
            />
            <br/>
            <button className="publishBlogButton">Publish New Blog!</button>
        </form>
    )
}
export default NewBlog


