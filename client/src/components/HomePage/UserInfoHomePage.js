import { useState } from "react"
import "./UserInfoHomePage.css"

import RenderedUsersBlogs from "./RenderedUsersBlogs"
import RenderUsers from "./RenderUsers"
import UserButton from "./UserButton"
import UserBlogButton from "./UserBlogButton"

function UserInfoHomePage({
    users,
    userBlogs,
    userAmountsArraySorted
}){
    const [userSignDate, setUserSignDate] = useState(false)
    const [userBlogDate, setUserBlogDate] = useState(false)

    //SORT THE USER BLOGS
    const handleUserBlogRender = () => {
        setUserBlogDate(!userBlogDate)
    }
    //Sort them by dates
    const userBlogDates = userBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
    const fourUserBlogDates = userBlogDates.slice(0, 4)
    

    //Sort them by views
    const userBlogViews = userBlogs.sort((a, b) => b.blog_views - a.blog_views)
    const fourUserBlogViews = userBlogViews.slice(0, 4)

    //SORT THE RENDERED USERS
    const renderUserBlogs = userBlogDate ? fourUserBlogViews.map((blogs, index) => (
        <div key={index}>
            <RenderedUsersBlogs blogs={blogs}/>
        </div>
    ))
    :
    fourUserBlogDates.map((blogs, index) => (
        <div key={index}>
            <RenderedUsersBlogs blogs={blogs}/>
        </div>
    ))

    //SORT THE RENDERED USERS
    const handleUserDonations = () => {
        setUserSignDate(!userSignDate)
    }
    //Sort them by dates
    const userSignDates = users.sort((a, b) => new Date(b.signup_date) - new Date(a.signup_date))
    const tenUserSignDates = userSignDates.slice(0, 10)

    //Show most active users

    const renderedUsers = userSignDate ? tenUserSignDates.map((users, index) => (
        <div key={index}>
            <RenderUsers 
                users={users}
                id={users.id}
            />
        </div>
    ))
    :
    userAmountsArraySorted.map((users, index) => (
        <div key={index}>
            <RenderUsers 
                users={users}
                id={users.user_id}
            />
        </div>
    ))

    return(
        <>
            <div className="userBlogHomeHeaderButton">
                <h2 className="userBlogHomePgChoice">{userBlogDate? `Most Popular User Blogs` : `Most Recent User Blogs`}</h2>
                <UserBlogButton handleUserBlogRender={handleUserBlogRender} userBlogDate={userBlogDate}/>
            </div>
            <div className="homePageUserBlogGrid">
                {renderUserBlogs}
            </div>

            <div className="userHomeHeaderButton">
                <h2>{userSignDate? `Newest Users to Chari-Tea` : `Most Active Users on Chari-Tea`}</h2>
                <UserButton handleUserDonations={handleUserDonations} userSignDate={userSignDate}/>
            </div>
            <div className="homePgUserGrid">
                {renderedUsers}
            </div>
        </>
    )
}
export default UserInfoHomePage



// import UserBlogButton from "./UserBlogButton"
// import RenderedUsersBlogs from "./RenderedUsersBlogs"
// import UserButton from "./UserButton"
// import RenderUsers from "./RenderUsers"

// import "./UserInfoHomePage.css"

// import { useState } from "react"

// function UserInfoHomePage({userBlogs, users}){
//     const[userBlogViews, setUserBlogsViews] = useState(false)
//     const[userDonations, setUserDonations] = useState(false)

//     const sortUserBlogViews = userBlogs.sort((a, b) => b.blog_views - a.blog_views)
//     const fourUserBlogViews = sortUserBlogViews.slice(0, 4)

//     // const sortUserBlogDate = userBlogs.sort((a, b) => b.blog_date - a.blog_date)
//     // const fourUserBlogDate = sortUserBlogDate.slice(0, 4)
//     const sortUserBlogDate = userBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
//     const fourUserBlogDate = sortUserBlogDate.slice(0, 4)

//     const handleUserBlogRender = () => {
//         setUserBlogsViews(!userBlogViews)
//     }

//     const renderedUsersBlogs = userBlogViews? fourUserBlogViews.map((blogs, index) => (
//         <div key={index}>
//             <RenderedUsersBlogs blogs={blogs}/>
//         </div>
//     ))
//     :
//     fourUserBlogDate.map((blogs, index) => (
//         <div key={index}>
//             <RenderedUsersBlogs blogs={blogs}/>
//         </div>
//     ))

//     //----------------------------------------------------------

//     const handleUserDonations = () => {
//         setUserDonations(!userDonations)
//     }

//     const usersCopy = users.slice(); // Create a shallow copy of users array
//     const sortUserDateDesc = usersCopy.sort((a, b) => new Date(b.signup_date) - new Date(a.signup_date));

//     const tenUserDates = sortUserDateDesc.slice(0, 10)

//     //Create a new attribute total_donations
//     users.forEach(user => {
//         user.total_donations = user.donations.reduce((sum, donation) => sum + donation.amount_donated, 0)
//     })

//     const sortUserDonations = users.sort((a, b) => b.total_donations - a.total_donations)
//     const tenUserDonations = sortUserDonations.slice(0, 10)

//     const renderedUsers = userDonations? tenUserDonations.map((users, index) => (
//         <div key={index}>
//             <RenderUsers users={users}/>
//         </div>
//     ))
//     :
//     tenUserDates.map((users, index) => (
//         <div key={index}>
//             <RenderUsers users={users}/>
//         </div>
//     ))

    // return(
    //     <>
    //         <div className="userBlogHomeHeaderButton">
    //             <h2 className="userBlogHomePgChoice">{userBlogViews? `Most Popular User Blogs` : `Most Recent User Blogs`}</h2>
    //             <UserBlogButton handleUserBlogRender={handleUserBlogRender} userBlogViews={userBlogViews}/>
    //         </div>
    //         <div className="homePageUserBlogGrid">
    //             {renderedUsersBlogs}
    //         </div>

    //         <div className="userHomeHeaderButton">
    //             <h2>{userDonations? `Most Active Users on Chari-Tea` : `Newest Users to Chari-Tea`}</h2>
    //             <UserButton handleUserDonations={handleUserDonations} userDonations={userDonations}/>
    //         </div>
    //         <div className="homePgUserGrid">
    //             {renderedUsers}
    //         </div>
    //     </>
    // )
// }
// export default UserInfoHomePage