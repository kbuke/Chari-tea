

import "./Home.css";

import { useOutletContext } from "react-router-dom";

import CharityInfo from "../components/HomePage/CharityInfo";
import UserInfoHomePage from "../components/HomePage/UserInfoHomePage";


function Home() {

  const appData = useOutletContext()

  const blogs = appData.blogs

  const charities = appData.charities

  const users=appData.users

  const charityBlogs = blogs.filter(blog => blog.charity)

  const userBlogs = blogs.filter(blog => blog.user)

  return(
    <div className="chariTeaHomePage">
      <h1 className="charityHomePgHeader">Charity Information</h1>
      <CharityInfo charities={charities} charityBlogs={charityBlogs} userBlogs={userBlogs}/>

      <h1 className="userHomePgHeader">User Information</h1>
      <UserInfoHomePage userBlogs={userBlogs} users={users}/>
    </div>
  )
}

export default Home;