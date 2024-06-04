import "./CharityBlogHomeFilter.css"

function CharityBlogHomeFilter({onSearch}){
    return(
        <input 
            className="charityHomePageSearchFilter"
            placeholder="Search for the Author of a (Charity) Blog"
            onChange={onSearch}
        />
    )
}
export default CharityBlogHomeFilter