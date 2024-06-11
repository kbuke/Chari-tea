import "./CharitiesHome.css"
import AllCharity from "../components/CharityHomePage/AllCharity.js"
import { useOutletContext } from "react-router-dom"

function CharitiesHome(){
    const appData = useOutletContext()
    const charities = appData.charities

    const setCharityLink = appData.setCharityLink
    
    return(
        <div className="charityHomePage">
            <h1 className="charityHeader">Charities Home Page</h1>
            <AllCharity charities={charities} setCharityLink={setCharityLink}/>
        </div>
    )
}
export default CharitiesHome