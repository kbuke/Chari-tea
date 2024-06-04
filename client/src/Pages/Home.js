
import { useState } from "react";
import "./Home.css";

import CharityInfo from "../components/HomePage/CharityInfo";
import UserInfoHomePage from "../components/HomePage/UserInfoHomePage";


function Home({ charities, blogs, users}) {
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