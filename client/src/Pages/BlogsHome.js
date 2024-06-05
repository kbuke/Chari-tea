import "./BlogsHome.css"

import { useOutletContext } from "react-router-dom"

import CharityBlogHome from "../components/BlogHome/CharityBlogHome"
import CharityBlogHomeFilter from "../components/BlogHome/CharityBlogHomeFilter"
import UserBlogHomeFilter from "../components/BlogHome/UserBlogHomeFilter"
import UserBlogHome from "../components/BlogHome/UserBlogHome"

import { useState } from "react"

function BlogsHome() {

    const appData = useOutletContext()
    const blogs = appData.blogs

    const [charitySearchBar, setCharitySearchBar] = useState("")
    const [userSearchBar, setUserSearchBar] = useState("")

    const [currentCharityBlogsPage, setCurrentCharityBlogsPage] = useState(0);
    const [currentUserBlogPage, setCurrentUserBlogPage] = useState(0)

    const handleCharityBlogSearch = (e) => {
        e.preventDefault()
        setCharitySearchBar(e.target.value)
    }

    const charityBlogs = blogs.filter(blog => blog.charity)

    const filteredCharityBlog = charityBlogs.filter((charityBlog) => {
        const charityName = charityBlog.charity.charity_name.toLowerCase()
        return charityName.includes(charitySearchBar.toLowerCase())
    })

    const itemsPerPage = 6;

    const charityStartIndex = currentCharityBlogsPage * itemsPerPage;
    const charityEndIndex = charityStartIndex + itemsPerPage;
    const charityCurrentBlogs = filteredCharityBlog.slice(charityStartIndex, charityEndIndex);

    const renderedCharities = charityCurrentBlogs.map((charity, index) => (
        <div key={index}>
            <CharityBlogHome charityBlogs={charity} />
        </div>
    ))

    const handleCharityBlogNextPage = () => {
        if((currentCharityBlogsPage + 1) * itemsPerPage < filteredCharityBlog.length){
            setCurrentCharityBlogsPage(currentCharityBlogsPage + 1)
        }
    }

    const handleCharityBlogPrevPage = () => {
        if (currentCharityBlogsPage > 0) {
            setCurrentCharityBlogsPage(currentCharityBlogsPage - 1)
        }
    }

    //-------------------------------User Blogs-----------------------------------
    const handleUserBlogSearch = (e) => {
        e.preventDefault()
        setUserSearchBar(e.target.value)
    }

    const userBlogs = blogs.filter(blog => blog.user)
    console.log(userBlogs)

    const filteredUsers = userBlogs.filter(userBlog => {
        const userName = userBlog.user.username.toLowerCase()
        return userName.includes(userSearchBar.toLowerCase())
    })

    const userStartIndex = currentUserBlogPage * itemsPerPage;
    const userEndIndex = userStartIndex + itemsPerPage;
    const userCurrentBlogs = filteredUsers.slice(userStartIndex, userEndIndex);

    const renderedUsers = userCurrentBlogs.map((user, index) => (
        <div key={index}>
            <UserBlogHome userBlogs={user}/>
        </div>
    ))

    const handleUserBlogNextPage = () => {
        if((currentUserBlogPage + 1) * itemsPerPage < filteredUsers.length) {
            setCurrentUserBlogPage(currentUserBlogPage + 1)
        }
    }

    const handleUserBlogPrevPage = () => {
        if(currentUserBlogPage > 0) {
            setCurrentUserBlogPage(currentUserBlogPage - 1)
        }
    }

    

    return(
        <div className="blogHomePageContainer">
            <h1 className="blogHomePageHeader">All Blogs</h1>

            <h2 className="charityBlogHomeHeader">Available Charity Blogs</h2>
            <CharityBlogHomeFilter onSearch={handleCharityBlogSearch}/>
            <div className="charityBlogsSection">
                <div className="charityBlogHomeRendered">
                    {renderedCharities}
                </div>
                <div className="charityBlogPaginationButtons">
                    <button onClick={handleCharityBlogPrevPage} disabled={currentCharityBlogsPage === 0} className="prevButton">Previous</button>
                    <button onClick={handleCharityBlogNextPage} disabled={(currentCharityBlogsPage + 1) * itemsPerPage >= charityBlogs.length} className="nextButton">Next</button>
                </div>
            </div>

            <h2 className="userBlogHomeHeader">Available User Blogs</h2>
            <UserBlogHomeFilter onSearch={handleUserBlogSearch}/>
            <div className="userBlogsSection">
                <div className="userBlogHomeRendered">
                    {renderedUsers}
                </div>
                <div className="userBlogPaginationButtons">
                    <button onClick={handleUserBlogPrevPage} disabled={currentUserBlogPage === 0} className="userPrevButton">Previous</button>
                    <button onClick={handleUserBlogNextPage} disabled={(currentUserBlogPage + 1) * itemsPerPage >= userBlogs.length} className="userNextButton">Next</button>
                </div>
            </div>
        </div>
    )


}
export default BlogsHome

