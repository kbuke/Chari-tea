import "./CharitiesHome.css"
import AllCharity from "../components/CharityHomePage/AllCharity.js"
import { useOutletContext } from "react-router-dom"

function CharitiesHome(){
    const appData = useOutletContext()
    const charities = appData.charities
    
    return(
        <div className="charityHomePage">
            <h1 className="charityHeader">Charities Home Page</h1>
            <AllCharity charities={charities}/>
        </div>
    )
}
export default CharitiesHome