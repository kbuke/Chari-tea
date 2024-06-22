import "./CharityBlogButton.css"

function CharityBlogButton({
    handleCharityBlogs, 
    charityBlogDate
}){
    return(
        <div className="charityBlogButtonHomeContainer">
            <button className="charityBlogViewButton" onClick={handleCharityBlogs}>{charityBlogDate? `Show Most Popular Blog Posts` : `Show Most Recent Blog Posts`}</button>
        </div>
    )
}
export default CharityBlogButton