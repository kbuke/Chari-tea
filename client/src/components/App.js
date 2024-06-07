import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";

import "./App.css"

function App() {
  const [charities, setCharities] = useState([])
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [userLogin, setUserLogin] = useState(false)
  const [charityLogin, setCharityLogin] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState([])
  const [loggedInCharity, setLoggedInCharity] = useState([])

  console.log(loggedInUser)

  useEffect(() => {
    //auto-login
    fetch("http://127.0.0.1:5555/check_session").then((r) =>{
      if(r.ok){
        r.json().then((userLogin) => setUserLogin(userLogin))
      }
    })
  },[])

  //Get All Charities
  useEffect(() => {
    fetch('http://127.0.0.1:5555/charities')
      .then(r => {
        if (r.ok) {
          return r.json()
        }
        throw r;
      })
      .then((charities) => setCharities(charities))
  },[]);

  //Get all blogs
  useEffect(() => {
    fetch('http://127.0.0.1:5555/blogs')
      .then(r => {
        if (r.ok) {
          return r.json()
        }
        throw r;
      })
      .then((blogInfo) => setBlogs(blogInfo))
  }, []);

  //Get all users
  useEffect(() => {
    fetch('http://127.0.0.1:5555/users')
      .then(r => {
        if (r.ok) {
          return r.json()
        }
        throw r
      })
      .then((userInfo) => setUsers(userInfo))
  },[])


  return (
    <div>
      <NavBar userLogin={userLogin} setUserLogin={setUserLogin} charityLogin={charityLogin} setCharityLogin={setCharityLogin} loggedInUser={loggedInUser} loggedInCharity={loggedInCharity}/>
      <Outlet context={
        {
          charities: charities,
          blogs: blogs,
          users: users,
          userLogin: userLogin,
          setUserLogin: setUserLogin,
          loggedInUser: loggedInUser,
          setLoggedInUser: setLoggedInUser,
          charityLogin: charityLogin,
          setCharityLogin: setCharityLogin,
          setLoggedInCharity: setLoggedInCharity
        }
      }/>
    </div>
  )
}

export default App





