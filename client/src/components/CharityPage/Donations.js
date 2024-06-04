import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Donations({ userImg, userName, userId, donated }) {
    return (
      <>
        <div className="donorImgContainer">
          <Link
            to={`/users/${userId}`}
          >
            <img className="donorImg" src={userImg} alt={`${userName}'s avatar`} />
          </Link>
        </div>
  
        <h3 className="donorInfo">{userName} donated £{donated}</h3>
      </>
    );
  }
  
  export default Donations;


