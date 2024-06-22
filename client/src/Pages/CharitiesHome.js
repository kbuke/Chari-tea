import "./CharitiesHome.css"
import { useOutletContext } from "react-router-dom"
import { useState } from "react"

import RenderedCharities from "../components/CharityHomePage/RenderedCharities.js"

function CharitiesHome(){
    const [searchBar, setSearchBar] = useState("")
    const [hoveredCharityId, setCharityHoveredId] = useState(null)
    
    const appData = useOutletContext()

    //Handle the search bar
    const handleSearch = (e) => {
        e.preventDefault()
        setSearchBar(e.target.value)
    }

    //Handle selectCharity Bar
    const setSelectCharity = appData.setSelectCharity

    //Get all charities
    const allCharities = appData.charities 

    //Filter Charities
    const filterCharities = allCharities ?
        allCharities.filter(charity => {
            const charityNameLower = charity.charity_name.toLowerCase()
            return charityNameLower.includes(searchBar.toLowerCase())
        })
        :
        null
    
    
    //Render Charities
    const renderedCharities = filterCharities ? 
        filterCharities.map((charity, index) => (
            <div key={index}>
                <RenderedCharities 
                    charityImg={charity.charity_icon}
                    charityName={charity.charity_name}
                    charityId={charity.id}
                    hoveredCharityId={hoveredCharityId}
                    setCharityHoveredId={setCharityHoveredId}
                    setSelectCharity={setSelectCharity}
                />
            </div>
        ))
        :
        null

    return(
        <div className="charityHomeContainer">
            <h1 className="charityHomeTitle">Available Charities on Chari-Tea</h1>
            <input 
                className="charityFilterSearch"
                placeholder="Search Available Charities"
                onChange={handleSearch}
            />
            <div className="charitiesHomeGrid">
                {renderedCharities}
            </div>
        </div>
    )
}
export default CharitiesHome