
import "./AllCharityCards.css"
import { Link } from "react-router-dom"

function AllCharityCards({ charities, setCharityLink }) {
  
  const allCharities = charities.map((charity, index) => (
    <div key={index} className="charityCardContainer">
      <Link
        to={`/charities/${charity.id}`}
        onClick={() => setCharityLink(false)}  
      >
        <img className="charityImg" src={charity.charity_icon} />
      </Link>
    </div>
  ));

  return (
    <div className="charityGrid">
      {allCharities}
    </div>
  );
}

export default AllCharityCards;
