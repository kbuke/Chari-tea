import "./UserBlogHomeFilter.css"

function UserBlogHomeFilter({onSearch}){
    return(
        <input 
            className="userHomePageSearchFilter"
            placeholder="Search for the Author of a (User) Blog"
            onChange={onSearch}
        />
    )
}
export default UserBlogHomeFilter