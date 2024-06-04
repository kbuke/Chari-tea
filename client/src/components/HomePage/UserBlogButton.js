import "./UserBlogButton.css"

function UserBlogButton({handleUserBlogRender, userBlogViews}){
    return(
        <div className="userBlogButtonHomeContainer">
            <button onClick={handleUserBlogRender} className="homePageUserBlogPostsButton">
                {userBlogViews? `Show Most Recent User Blog Posts` : `Show Most Popular User Blogs`}
            </button>
        </div>
    )
}
export default UserBlogButton