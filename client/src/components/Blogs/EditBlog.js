import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import "./EditBlog.css"


function EditBlog({
    blogContent,
    blogTitle,
    allBlogs,
    setAllBlogs,
    setEditBlogTitle,
    setEditBlogContext
}){

    return(
        <div className="renderedBlog">
            <div className="blogTitleInfo">
                <input 
                    className="editBlogTitleInput"
                    onChange={(e) => setEditBlogTitle(e.target.value)}
                    defaultValue={blogTitle}
                />
            </div>
            <textarea
                className="editBlogContent"
                onChange={(e) => setEditBlogContext(e.target.value)}
                defaultValue={blogContent}
            />
        </div>
    )
}
export default EditBlog