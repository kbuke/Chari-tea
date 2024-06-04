import "./UserActivity.css"

function UserActivity({donations, username, userBlogs}){
    const numberDonation = donations ? donations.length : 0;

    const amountDonated = donations ? donations.map(donation => donation.amount_donated) : [];
    const donatedSum = amountDonated.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const numberBlogs = userBlogs? userBlogs.length : 0


    return (
        <div className="activityGrid">
            <div className="activityOne">
                <h2 className="donationNumber">{username} has made {numberDonation} donations on Chari-Tea so far</h2>
            </div>

            <div className="activityTwo">
                <h2 className="donationRaised">{username} has raised £{donatedSum.toFixed(2)} so far on Chari-Tea</h2>
            </div>

            <div className="activityThree">
                <h2 className="blogNumber">{username} has posted {numberBlogs} Blog so far on Chari-Tea</h2>
            </div>
        </div>
    );
}

export default UserActivity;