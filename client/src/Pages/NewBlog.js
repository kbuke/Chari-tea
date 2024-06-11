import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react"
import "./NewBlog.css"

function NewBlog(){
    const appData = useOutletContext()
    const loggedUser = appData.loggedInUser
    const userId = loggedUser.id
    const charityId = appData.loggedInCharity.id

    const navigate = useNavigate()

    const [blogTitle, setBlogTitle] = useState("")
    const [blogImg, setBlogImg] = useState("")
    const [blogContent, setBlogContent] = useState("")
    const [active, setActive] = useState(false)
    const blogViews = 0

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/blogs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogTitle, blogImg, blogContent, blogViews, userId, charityId })
        })
        .then((r) => {
            if(r.ok){
                navigate(`/`)
                return r.json()
            } else {
                r.json().then((error) => console.error(error))
                throw new Error("Invalid Blog")
            }
        })
        .then((blog) => {
            console.log(blog)
        })
        .catch((error) => console.error(error))
    }

    const handleActive = () => {
        setActive(true)
    }

    const handleTitleChange = (e) => {
        setBlogTitle(e.target.value)
    }

    const handleImgChange = (e) => {
        setBlogImg(e.target.value)
    }

    const handleContentChange = (e) => {
        setBlogContent(e.target.value)
    }

    const activeOff = () => {
        setActive(false)
    }

    return (
        <form className="newBlogPost" onSubmit={handleSubmit}>
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


