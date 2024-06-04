import "./UserButton.css"

function UserButton({handleUserDonations, userDonations}){
    return(
        <div className="userButtonHomeContainer">
            <button className="userViewButton" onClick={handleUserDonations}>
            {   userDonations? `Show Newly Registered Users` : `Show Most Active Users`}
            </button>
        </div>
    )
}
export default UserButton