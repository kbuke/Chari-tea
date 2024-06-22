import "./UserBlogButton.css"

function UserBlogButton({
    handleUserBlogRender,
    userBlogDate
}){
    return(
        <div className="userBlogButtonHomeContainer">
            <button onClick={handleUserBlogRender} className="homePageUserBlogPostsButton">
                {userBlogDate? `Show Most Recent User Blog Posts` : `Show Most Popular User Blogs`}
            </button>
        </div>
    )
}
export default UserBlogButton