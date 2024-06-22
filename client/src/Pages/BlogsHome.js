import { useOutletContext } from "react-router-dom"
import "./BlogsHome.css"
import { useState } from "react"

import UserBlogs from "../components/BlogHome/UserBlogs"
import CharityBlogs from "../components/BlogHome/CharityBlogs"

function BlogsHome(){
    const [userBlogButton, setUserBlogButton] = useState(true)
    const [searchBar, setSearchBar] = useState("")

    //Sort the selected blog category
    const handleBlogSelection = () => {
        setUserBlogButton(!userBlogButton)
    }

    //Handle blog search
    const handleSearch = (e) => {
        e.preventDefault()
        setSearchBar(e.target.value)
    }

    const appData=useOutletContext()

    //Get all blogs
    const allBlogs = appData.blogs 
    console.log(allBlogs)

    //Filter Blogs
    const filterBlogs = allBlogs ? 
        allBlogs.filter(blog => {
            const blogTitleLower = blog.blog_title.toLowerCase()
            return blogTitleLower.includes(searchBar.toLowerCase())
        })
        :
        null
    console.log(filterBlogs)

    //Handles highlight blogs
    const setSelectBlogs = appData.setSelectBlogs

    const handleBlogSelect = () => {
        setSelectBlogs(false)
    }

    //Sort by user blogs and charities blogs
    const charityBlogs = filterBlogs.filter(blogs => blogs.charity_id)

    const userBlogs = filterBlogs.filter(blogs => blogs.user_id)

    //Handle User Blogs
   
    //Sort by Blog Dates
    const userBlogDates = userBlogs ? 
        userBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
        :
        null
    
    const renderedUserBlogs = userBlogDates ?
        userBlogDates.map((userBlog, index) => (
            <div key={index}>
                <UserBlogs 
                    blogId={userBlog.id}
                    blogTitle={userBlog.blog_title}
                    blogViews={userBlog.blog_views}
                    blogImg={userBlog.cover_img}
                    blogDate={userBlog.blog_date}
                    userId={userBlog.user_id}
                    userImg={userBlog.user? userBlog.user.user_icon : null}
                    handleBlogSelect={handleBlogSelect}
                />
            </div>
        ))
        :
        null
    
    //Handle Charity Blogs
    console.log(charityBlogs)
    //Sort by  Blog Dates
    const charityBlogDates = charityBlogs ? 
        charityBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
        :
        null
    
        console.log(charityBlogDates)
    
    const renderedCharityBlogs = charityBlogDates ? 
        charityBlogDates.map((blog, index) => (
            <div key={index}>
                <CharityBlogs 
                    blogId={blog.id}
                    blogName={blog.blog_title}
                    blogDate={blog.blog_date}
                    blogViews={blog.blog_views}
                    blogImg={blog.cover_img}
                    charityId={blog.charity_id}
                    charityImg={blog.charity.charity_icon}
                    handleBlogSelect={handleBlogSelect}
                />
            </div>
        ))
        :
        null

    return(
        <div className="blogsHomeContainer">
            <h1 className="blogsHomeHeader">Blogs Home</h1>
            <div className="blogsShowCase">
                <div className="userCharityBlogButton">
                    {userBlogButton ? 
                        <button className="selectedBlogs">
                            User Blogs
                        </button>
                        :
                        <button 
                            className="deselectedBlogs"
                            onClick={handleBlogSelection}
                        >
                            User Blogs
                        </button>
                    }
                    {userBlogButton ? 
                        <button 
                            className="deselectedBlogs"
                            onClick={handleBlogSelection}
                        >
                            Charity Blogs
                        </button>
                        :
                        <button className="selectedBlogs">
                            Charity Blogs
                        </button>
                    }
                </div>

                <input 
                    className="filterBlogs"
                    placeholder={`Search ${userBlogButton ? "User" : "Charity"} Blogs`}
                    onChange={handleSearch}
                />

                <div className="renderBlogs">
                    {userBlogButton ? 
                        renderedUserBlogs
                        :
                        renderedCharityBlogs
                    }
                </div>
            </div>
        </div>
    )
    
}
export default BlogsHome


