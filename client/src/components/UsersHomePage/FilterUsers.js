import "./FilterUsers.css"

function FilterUsers({handleSearch}){
    return(
        <div className="filterUsers">
            <input 
                className="userSearch"
                type="text"
                placeholder="Search for a User"
                onChange={handleSearch}
            />
        </div>
    )
}
export default FilterUsers