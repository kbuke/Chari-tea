import { Link } from "react-router-dom";

import "./RenderedCharities.css"

function RenderedCharities({
    charityImg,
    charityName,
    charityId,
    hoveredCharityId,
    setCharityHoveredId,
    setSelectCharity
}){
    console.log(charityImg)
    const hoverTrue = () => {
        setCharityHoveredId(charityId)
    }

    const hoverFalse = () => {
        setCharityHoveredId(null)
    }

    const turnOffCharity = () => {
        setSelectCharity(false)
    }

    return(
        <div className="charityHomeImgContainer">
            <Link 
                to={`/charities/${charityId}`}
                onClick={turnOffCharity}
            >
                {hoveredCharityId === charityId ? (
                    <img 
                        className="hoverImg"
                        src={charityImg}
                        onMouseLeave={hoverFalse}
                        alt="renderedCharity"
                    />
                ) : (
                    <img 
                        className="noHover"
                        src={charityImg}
                        onMouseEnter={hoverTrue}
                        alt="hoveredCharity"
                    />
                )}
                <h2>{charityName}</h2>
            </Link>
        </div>
    )
}
export default RenderedCharities