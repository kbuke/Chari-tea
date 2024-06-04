import "./Relations.css"

function Relations({donatedAmount, charityName, donatedSum, formattedDate}){
    return(
        <div className="relationGrid">
            <div className="numberDonationsContainer">
                <h2 className="numberDonations">{charityName} has received {donatedAmount.length} donations so far!</h2>
            </div>

            <div className="donatedSumContainer">
                <h2 className="donatedSum">{charityName} has received £{donatedSum.toFixed(2)} on Chari-Tea so far!</h2>
            </div>

            <div className="charitySignUpDateContainer">
                <h2 className="charitySignUpDate">{charityName} has been registered with Chari-Tea, since {formattedDate}</h2>
            </div>
            
        </div>
    )
}
export default Relations