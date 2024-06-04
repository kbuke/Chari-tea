import "./CharityButton.css"

function CharityButton({handleCharityDonations, charityDonations}){
    return(
        <div className="charityHomeButtonContainer">
            <button onClick={handleCharityDonations} className="HomePageCharityRenderButton">
                {charityDonations? `Show Most Recent Charities` : `Show Most Popular Charities`}
            </button>
        </div>
    )
}
export default CharityButton