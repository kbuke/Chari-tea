import "./UsersHome.css"
import { useOutletContext } from "react-router-dom"

import UserLinks from "../components/UsersHomePage/UserLinks"
import User from "./User"
import FilterUsers from "../components/UsersHomePage/FilterUsers"
import { useState } from "react"

function UsersHome(){
    const appData = useOutletContext()
    const users = appData.users

    const[searchUser, setSearchUser] = useState("")

    const setUserLink = appData.setUserLink

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchUser(e.target.value)
    }

    const filteredUsers = users.filter(user => {
        const userName = user.username.toLowerCase()
        if(userName.includes(searchUser.toLowerCase())) return userName
    })

    console.log(filteredUsers)

    const userInfo = filteredUsers.map((user, index) => (
        <div key={index}>
            <UserLinks 
                userImg={user.user_icon} 
                userName={user.username} 
                userId={user.id}
                setUserLink={setUserLink}
            />
        </div>
    ))
    return(
        <div className="charitiesHomeContainer">
            <div className="userHomeTitle">
                <h1>All Users</h1>
            </div>

            <div className="filterUsers">
                <FilterUsers handleSearch={handleSearch}/>
            </div>

            <div className="usersGrid">
                {userInfo}
            </div>
        </div>
    )
}
export default UsersHome