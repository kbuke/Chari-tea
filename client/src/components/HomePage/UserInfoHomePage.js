import UserBlogButton from "./UserBlogButton"
import RenderedUsersBlogs from "./RenderedUsersBlogs"
import UserButton from "./UserButton"
import RenderUsers from "./RenderUsers"

import "./UserInfoHomePage.css"

import { useState } from "react"

function UserInfoHomePage({userBlogs, users}){
    const[userBlogViews, setUserBlogsViews] = useState(false)
    const[userDonations, setUserDonations] = useState(false)

    const sortUserBlogViews = userBlogs.sort((a, b) => b.blog_views - a.blog_views)
    const fourUserBlogViews = sortUserBlogViews.slice(0, 4)

    const sortUserBlogDate = userBlogs.sort((a, b) => b.blog_date - a.blog_date)
    const fourUserBlogDate = sortUserBlogDate.slice(0, 4)

    const handleUserBlogRender = () => {
        setUserBlogsViews(!userBlogViews)
    }

    const renderedUsersBlogs = userBlogViews? fourUserBlogViews.map((blogs, index) => (
        <div key={index}>
            <RenderedUsersBlogs blogs={blogs}/>
        </div>
    ))
    :
    fourUserBlogDate.map((blogs, index) => (
        <div key={index}>
            <RenderedUsersBlogs blogs={blogs}/>
        </div>
    ))

    //----------------------------------------------------------

    const handleUserDonations = () => {
        setUserDonations(!userDonations)
    }

    const sortUserDate = users.sort((a, b) => b.signup_date - a.signup_date)
    const fiveUserDates = sortUserDate.slice(0, 5)

    //Create a new attribute total_donations
    users.forEach(user => {
        user.total_donations = user.donations.reduce((sum, donation) => sum + donation.amount_donated, 0)
    })

    const sortUserDonations = users.sort((a, b) => b.total_donations - a.total_donations)
    const fiveUserDonations = sortUserDonations.slice(0, 5)

    const renderedUsers = userDonations? fiveUserDonations.map((users, index) => (
        <div key={index}>
            <RenderUsers users={users}/>
        </div>
    ))
    :
    fiveUserDates.map((users, index) => (
        <div key={index}>
            <RenderUsers users={users}/>
        </div>
    ))

    return(
        <>
            <div className="userBlogHomeHeaderButton">
                <h2 className="userBlogHomePgChoice">{userBlogViews? `Most Popular User Blogs` : `Most Recent User Blogs`}</h2>
                <UserBlogButton handleUserBlogRender={handleUserBlogRender} userBlogViews={userBlogViews}/>
            </div>
            <div className="homePageUserBlogGrid">
                {renderedUsersBlogs}
            </div>

            <div className="userHomeHeaderButton">
                <h2>{userDonations? `Most Active Users on Chari-Tea` : `Newest Users to Chari-Tea`}</h2>
                <UserButton handleUserDonations={handleUserDonations} userDonations={userDonations}/>
            </div>
            <div className="homePgUserGrid">
                {renderedUsers}
            </div>
        </>
    )
}
export default UserInfoHomePage