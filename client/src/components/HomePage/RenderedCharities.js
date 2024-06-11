import "./RenderedCharities.css"
import { Link } from "react-router-dom"

function RenderedCharities({charity}){
    return(
        <div className="renderedHomeCharities">
            <Link
                to={`/charities/${charity.id}`}
            >
                <div className="homePgCharityImgContainer">
                    <img className="homePgCharityImg" src={charity.charity_icon}/>
                </div>
            </Link>
        </div>
    )
}
export default RenderedCharities