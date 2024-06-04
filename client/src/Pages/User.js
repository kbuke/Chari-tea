import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import "./User.css"

import UserInfo from "../components/UserPage/UserInfo"
import UserActivity from "../components/UserPage/UserActivity"
import UserDonations from "../components/UserPage/UserDonations"
import UserBlogs from "../components/UserPage/UserBlogs"

function User({users}){
    const params = useParams()
    const specificUser = users.find(user => user.id === parseInt(params.id))

    const[userInfo, setUserInfo] = useState([])

    useEffect(() => {
        if(specificUser) {
            fetch(`http://127.0.0.1:5555/users/${specificUser.id}`)
                .then((r) => {
                    if(r.ok) {
                        return r.json()
                    }
                    throw r;
                })
                .then((userInfo) => {
                    setUserInfo(userInfo)
                })
        }
    }, [specificUser])

  const userDonations = userInfo.donations

  const charityDonations = userDonations? userDonations.map(charityInfo => charityInfo.charity) : null

  const specificCharity = charityDonations? charityDonations.map((charity, index) => (
    <div key={index}>
        <UserDonations charityId={charity.id} charityImg={charity.charity_icon}/>
    </div>
  )) : []

  const usersBlogs = userInfo.blogs

  const specificBlogs = usersBlogs? usersBlogs.map((blog, index) => (
    <div key={index}>
        <UserBlogs blogImg={blog.cover_img} blogTitle={blog.blog_title} blogId={blog.id}/>
    </div>
  )) : []

    return(
        <div className="userProfileContainer">
            <UserInfo userImg={specificUser.user_icon} userName={userInfo.username}/>
            <div className="activityHeader">
                <h1>{userInfo.username} Activity</h1>
                <UserActivity donations={userInfo.donations} username={userInfo.username} userBlogs={userInfo.blogs}/>
            </div>

            <div className="donationsHeader">
                <h1>{userInfo.username}'s Chosen Charities</h1>
                <div className="charityDonationGrid">
                    {specificCharity}
                </div>
            </div>

            <div className="blogsHeader">
                <h1>{userInfo.username}'s Blog Posts</h1>
                <div className="userBlogsGrid">
                    {specificBlogs}
                </div>
            </div>
        </div>
    )
}
export default User