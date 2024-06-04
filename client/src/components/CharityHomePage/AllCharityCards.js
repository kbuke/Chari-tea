
import "./AllCharityCards.css"
import { Link } from "react-router-dom"

function AllCharityCards({ charities }) {

  const allCharities =charities.map((charity, index) => (
    <div key={index} className="charityCardContainer">
        <Link
            to={`charities/${charity.id}`}
        >
            <img className="charityImg" src={charity.charity_icon} />
        </Link>
    </div>
  ))

  return (
    <div className="charityGrid"> {/* Apply the charityGrid class here */}
      {allCharities}
    </div>
  )
}

export default AllCharityCards