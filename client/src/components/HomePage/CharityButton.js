import "./CharityButton.css"

function CharityButton({
    handleCharities,
    charitySignUpDate
}){
    return(
        <div className="charityHomeButtonContainer">
            <button onClick={handleCharities} className="HomePageCharityRenderButton">
                {charitySignUpDate ? `Show Most Popular Charities` : `Show Most Recent Charities`}
            </button>
        </div>
    )
}
export default CharityButton