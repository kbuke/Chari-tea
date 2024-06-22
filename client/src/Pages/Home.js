import { useOutletContext } from "react-router-dom"

import "./Home.css"
import CharityInfo from "../components/HomePage/CharityInfo";
import UserInfoHomePage from "../components/HomePage/UserInfoHomePage";


function Home(){

    const appData = useOutletContext()

    //Get Charities 
    const charities = appData.charities

    //Get Users 
    const users = appData.users

    //Get Blogs  
    const blogs = appData.blogs

    // Get Donations
    const donations = appData.donations;

    const charityAmountsArray = appData.charityAmountsArray
    const userAmountsArray = appData.userAmountsArray


    //Sort amount charity receives
    const sortCharityAmountsArray = charityAmountsArray.sort((a, b) => b.amount_raised - a.amount_raised)

    const userAmountsArraySorted = userAmountsArray.sort((a, b) => b.amount_raised - a.amount_raised)

    console.log(blogs)
    
    //Get all blogs by charities
    const charityBlogs = blogs.filter(blog => blog.charity_id)

    //Get all blogs by users
    const userBlogs = blogs.filter(blog => blog.user_id)

    return (
        <div className="chariTeaHomePage">
            <h1 className="charityHomePgHeader">Charity Information</h1>
            <CharityInfo 
                charities={charities}
                charityBlogs={charityBlogs}
                donations={donations}
                sortCharityAmountsArray={sortCharityAmountsArray}
            />

            <h1 className="userHomePgHeader">User Information</h1>
            <UserInfoHomePage 
                users={users} 
                userBlogs={userBlogs}
                userAmountsArraySorted={userAmountsArraySorted}
            />
        </div>
    )
}
export default Home
