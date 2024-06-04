import "./CharityFilter.css"

function CharityFilter({handleSearch}){
    return(
        <div className="filterSection">
            <input 
                className="charitySearch"
                type="text"
                placeholder="Search for a Charity"
                onChange={handleSearch}
            />
        </div>
    )
}
export default CharityFilter