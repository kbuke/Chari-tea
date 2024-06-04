import "./CharityBlogButton.css"

function CharityBlogButton({handleCharityBlogs, charityBlogViews}){
    return(
        <div className="charityBlogButtonHomeContainer">
            <button className="charityBlogViewButton" onClick={handleCharityBlogs}>{charityBlogViews? `Show Most Recent Blog Posts` : `Show Most Popular Blog Posts`}</button>
        </div>
    )
}
export default CharityBlogButton