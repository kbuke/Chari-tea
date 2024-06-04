import "./AllCharity.css"
import CharityFilter from "./CharityFilter.js"
import AllCharityCards from "./AllCharityCards.js"
import { useState } from "react"

function AllCharity({charities}){

    const[searchBox, setSearchBox] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchBox(e.target.value)
    }

    const filterCharities = charities.filter(charity => {
        const charityName = charity.charity_name.toLowerCase()
        if(charityName.includes(searchBox.toLowerCase())) return charityName
    })

    return(
        <div className="allCharityContainer">
            <h2>Show All Charities</h2>
            <CharityFilter handleSearch={handleSearch}/>
            <AllCharityCards charities={filterCharities}/>  
        </div>
    )
}
export default AllCharity