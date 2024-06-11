import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

import "./User.css"

import UserInfo from "../components/UserPage/UserInfo"
import UserActivity from "../components/UserPage/UserActivity"
import UserDonations from "../components/UserPage/UserDonations"
import UserBlogs from "../components/UserPage/UserBlogs"

function User(){

    const appData = useOutletContext()

    const users = appData.users
    const loggedInUser = appData.loggedInUser
    const loggedInUserId = loggedInUser? loggedInUser.id : []
    

    const params = useParams()
    const specificUser = users.find(user => user.id === parseInt(params.id))
    const specificUserId = specificUser.id 

    const showCharities = 6

    const userCheck = loggedInUserId == specificUserId? true : false
    
    const[userInfo, setUserInfo] = useState([])
    const [allCharities, setAllCharities] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setAllCharities(!allCharities)
    }

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
  console.log(charityDonations)

  const sixCharities = charityDonations? charityDonations.slice(0, showCharities) : null

  const specificCharity = charityDonations? charityDonations.map((charity, index) => (
    <div key={index}>
        <UserDonations charityId={charity.id} charityImg={charity.charity_icon}/>
    </div>
  )) : []

  const specific6Charities = sixCharities? sixCharities.map((charity, index) => (
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
            <UserInfo userImg={specificUser.user_icon} userName={userInfo.username} userCheck={userCheck}/>
            <div className="activityHeader">
                <h1>{userInfo.username} Activity</h1>
                <UserActivity donations={userInfo.donations} username={userInfo.username} userBlogs={userInfo.blogs}/>
            </div>

            <div className="donationsHeader">
                <h1>{userInfo.username}'s Chosen Charities</h1>
                <div className="charityDonationGrid">
                    {/* {specificCharity} */}
                    {allCharities? specificCharity : specific6Charities}
                </div>
                <button className="charityShowButton" onClick={handleClick}>{allCharities? "Show Most Recent Charities":"Show All Charities"}</button>
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