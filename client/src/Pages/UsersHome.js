import { useOutletContext } from "react-router-dom";
import "./UsersHome.css";
import { useState } from "react";

import RenderedUsers from "../components/UsersHomePage/RenderedUsers";

function UsersHome() {
    const [searchBar, setSearchBar] = useState("");
    const [hoveredUserId, setHoveredUserId] = useState(null); // State to keep track of hovered user ID

    // Handle Search Bar
    const handleUserSearch = (e) => {
        e.preventDefault();
        setSearchBar(e.target.value);
    };

    const appData = useOutletContext();

    //Get the selectUsers bar
    const setSelectUser = appData.setSelectUser

    // Get all users
    const users = appData.users;

    // Handle filter system
    const filterUsers = users
        ? users.filter((user) => user.username.includes(searchBar))
        : null;

    // Handle the render of users
    const renderUsers = filterUsers
        ? filterUsers.map((user, index) => (
              <div key={index}>
                  <RenderedUsers
                      userId={user.id}
                      userImg={user.user_icon}
                      userName={user.username}
                      hoveredUserId={hoveredUserId}
                      setHoveredUserId={setHoveredUserId}
                      setSelectUser={setSelectUser}
                  />
              </div>
          ))
        : null;

    return (
        <div className="userHomePageContainer">
            <h1 className="userHomeHeader">Available Users on Chari-Tea</h1>
            <input
                className="userHomeSearchBar"
                placeholder="Search for users on Chari-Tea"
                onChange={handleUserSearch}
            />
            <div className="userHomeGrid">{renderUsers}</div>
        </div>
    );
}

export default UsersHome;

