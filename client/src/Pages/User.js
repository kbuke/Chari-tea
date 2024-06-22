

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

import "./User.css"

import UserInfo from "../components/UserPage/UserInfo"
import UserDonations from "../components/UserPage/UserDonations"
import UserBlogs from "../components/UserPage/UserBlogs"

function User(){
    const appData = useOutletContext()

    const users = appData.users 
    console.log(users)
    const amountRaised = appData.userAmountsArray

    const loggedUserInfo = appData.user
    console.log(loggedUserInfo)

    //Check which user is logged in
    const loggedInUser = appData.user 
    const loggedInUserId = loggedInUser? loggedInUser.id : null

    const params = useParams()
    console.log(params)
    const specificUser = users.find(user => user.id === parseInt(params.id))
    const specificUserId = specificUser? specificUser.id : null

    const [userInfo, setUserInfo] = useState([])
    let [userBlogsNumber, setUserBlogsNumber] = useState(0)
    let [userCharities, setUserCharities] = useState(0)

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/users/${specificUserId}`)
        .then((r) => {
            if(r.ok) {
                return r.json()
            }
            throw r
        })
        .then(userInfo => setUserInfo(userInfo))
    }, [specificUserId])

    //Handle User Top
    const userImg = userInfo.user_icon
    const userName = userInfo.username
    const userSignUpDate = userInfo.signup_date
    const userEmail = userInfo.email
    const userId = userInfo.id

    //Handle User Blogs
    const blogsPerPage = 3

    const moreBlogs = () => {
        setUserBlogsNumber(userBlogsNumber += blogsPerPage)
    }

    const lessBlogs = () => {
        setUserBlogsNumber(userBlogsNumber -= blogsPerPage)
    }

    const userBlogs = userInfo.blogs 

    const numberOfBlogs = userBlogs ?
        userBlogs.length
        :
        null
    
    const sortUserBlogDates = userBlogs ? 
        userBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
        :
        null
    
    const sliceUserBlogs = sortUserBlogDates ?
        sortUserBlogDates.slice(userBlogsNumber, userBlogsNumber + blogsPerPage)
        :
        null
    
    const renderedBlogs = sliceUserBlogs ? 
        sliceUserBlogs.map((blog, index) => (
            <div key={index}>
                <UserBlogs 
                    blogImg={blog.cover_img}
                    blogTitle={blog.blog_title}
                    blogId={blog.id}
                />
            </div>
        ))
        :
        null
    
    //Handle donations to charity 
    const charityPerPage = 10

    const moreCharities = () => {
        setUserCharities(userCharities += charityPerPage)
    }

    const lessCharities = () => {
        setUserCharities(userCharities -= charityPerPage)
    }

    const userDonations = userInfo.donations 

    const testDonations = userDonations? 
        userDonations.map(user => user.charity)
        :
        null

    const seen = new Set();

    const uniqueArray = testDonations ? 
        testDonations.filter(item => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);
            return !duplicate;
        })
        :
        null
    
    const charityNumber = uniqueArray ? 
        uniqueArray.length
        :
        null
    
    const slicedCharities = uniqueArray? 
        uniqueArray.slice(0, userCharities + charityPerPage)
        :
        null
    
    const renderedCharities = slicedCharities ? 
        slicedCharities.map((charity, index) => (
            <div key={index}>
                <UserDonations 
                    charityImg={charity.charity_icon}
                    charityId={charity.id}
                />
            </div>
    ))
    :
    null



    const specificRaised = amountRaised ? 
        amountRaised.filter(user => user.user_id === userInfo.id) 
    : 
    null;

    const renderedAmount = specificRaised && specificRaised.length > 0 ? 
        specificRaised[0].amount_raised 
    : 
    null;

    return(
        <div className="userProfileContainer">
            <UserInfo 
                userImg={userImg}
                userName={userName}
                userSignUpDate={userSignUpDate}
                userEmail={userEmail}
                loggedInUserId={loggedInUserId}
                userId={userId}
            />

            <div className="userBlogs">
                <h2 className="blogsHeader">{userName} Published Blogs ({numberOfBlogs})</h2>
                <div className="userBlogsContainers">
                    {renderedBlogs}
                </div>
                <div className="blogToggleButtons">
                    {userBlogsNumber === 0 ?
                        <button className="noPrevButton">
                            Recent Blogs
                        </button>
                        :
                        <button 
                            className="recentButton"
                            onClick={lessBlogs}
                        >
                            Recent Blogs
                        </button>
                    }

                    {numberOfBlogs <= userBlogsNumber + blogsPerPage ?
                        <button className="noNextButton">
                            Past Blogs
                        </button>
                        :
                        <button 
                            className="previousButton"
                            onClick={moreBlogs}
                        >
                            Past Blogs
                        </button>
                    }
                </div>
            </div>

            <div className="donationsHeader">
                    <h2>{userName} has donated £{renderedAmount} to:</h2>
                    <div className="renderedCharityDonationGrid">
                        {renderedCharities}
                    </div>
                    <div className="charityDonorButtons">
                        {userCharities === 0 ?
                            <button className="noLess">
                                Less Charities
                            </button>
                            :
                            <button
                                className="showLessCharities"
                                onClick={lessCharities}
                            >
                                Less Charities
                            </button>
                        }
                        {charityNumber <= userCharities + charityPerPage ? 
                            <button className="noMore">
                                More Charities
                            </button>
                            :
                            <button 
                                className="showMoreCharities"
                                onClick={moreCharities}>
                                More Charities
                            </button>
                        }
                    </div>
            </div>
        </div>
    )
}
export default User

