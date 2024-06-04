import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
// import Home from "../Pages/Home";
// import About from "../Pages/About";
// import CharitiesPage from "../Pages/CharitiesPage";
// import CharitiesHome from "../Pages/CharitiesHome";
// import BlogPost from "../Pages/BlogPost";
// import User from "../Pages/User";
// import UsersHome from "../Pages/UsersHome";
// import BlogsHome from "../Pages/BlogsHome";
// import UserSignUpSignIn from "../Pages/UserSignUpSignIn";

import "./App.css"

function App() {
  const [charities, setCharities] = useState([])
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])

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
      <NavBar />

      {/* <Switch>
        <Route exact path="/" render={() => <Home charities={charities} blogs={blogs} users={users}/>} />
        <Route exact path="/charities/:id" render={() => <CharitiesPage charities={charities} />}/>
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/charities" render={() => <CharitiesHome charities={charities}/>}/>
        <Route exact path="/blogpost/:id" render={() => <BlogPost blogs={blogs}/>}/>
        <Route exact path="/users/:id" render={() => <User users={users}/>}/>
        <Route exact path="/users" render={() => <UsersHome users={users}/>}/>
        <Route exact path="/blogs" render={() => <BlogsHome blogs={blogs}/>}/>
        <Route exact path="/signup" render={() => <UserSignUpSignIn />}/>
      </Switch> */}
    </div>
  )
}

export default App





