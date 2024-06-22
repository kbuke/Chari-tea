import "./RenderedCharities.css"
import { Link } from "react-router-dom"

function RenderedCharities({
    charity,
    id
}){
    return(
        <div className="renderedHomeCharities">
            <Link
                to={`/charities/${id}`}
            >
                <div className="homePgCharityImgContainer">
                    <img 
                        className="homePgCharityImg" 
                        src={charity.charity_icon}
                        alt="homeCharityImage"
                    />
                </div>
            </Link>
        </div>
    )
}
export default RenderedCharities