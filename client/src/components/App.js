import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import "./App.css"

function App(){
  const [charities, setCharities] = useState([])
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const [reviews, setReviews] = useState([])
  const [donations, setDonations] = useState([])

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [charityLoggedIn, setCharityLoggedIn] = useState(false)

  const [user, setUser] = useState(null)
  const [charity, setCharity] = useState(null)

  const [selectCharity, setSelectCharity] = useState(false)
  const [selectUser, setSelectUser] = useState(false)
  const [selectBlogs, setSelectBlogs] = useState(false)
  const [selectUserSignUp, setSelectUserSignUp] = useState(false)
  const [selectUserSignIn, setSelectUserSignIn] = useState(false)
  const [selectCharitySignUp, setSelectCharitySignUp] = useState(false)
  const [selectCharitySignIn, setSelectCharitySignIn] = useState(false)


  //Get all charities
  useEffect(() => {
    fetch("/charities")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(charities => setCharities(charities))
  }, [])

  //Get all users
  useEffect(() => {
    fetch("/users")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(users => setUsers(users))
  }, [])

  //Get all blogs
  useEffect(() => {
    fetch("/blogs")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(blogs => setBlogs(blogs))
  }, [])

  //Get all reviews
  useEffect(() => {
    fetch("/reviews")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(reviews => setReviews(reviews))
  }, [])

  //Get all donations
  useEffect(() => {
    fetch("/donations")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r
    })
    .then(donations => setDonations(donations))
  }, [])

  //Handle user auto sign in
  useEffect(() => {
    fetch("/usercheck_session")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
      .then((user) => {
        setUser(user);
        setUserLoggedIn(true);
      })
      .catch((error) => {
        console.error("User session check error: ", error);
      });
  }, []);
  

  // Show Charities that have raised the most
  const charityTotals = {};

  // Aggregate the donations and charity icons
  donations.forEach(donation => {
    const charityId = donation.charity_id;
    const amountDonated = donation.amount_donated;
    const charityImg = donation.charity.charity_icon;

    // If the charityId already exists in the charityTotals object, add the amount donated to its total
    if (charityTotals[charityId]) {
        charityTotals[charityId].amount_raised += amountDonated;
    } else {
        // Otherwise, initialize the total with the amount donated and set the charity icon
        charityTotals[charityId] = {
            amount_raised: amountDonated,
            charity_icon: charityImg
        };
    }
  });

  // Step 2: Create a new array with charity ID, the total amount raised, and the charity icon
  const charityAmountsArray = Object.keys(charityTotals).map(charityId => {
    return {
      charity_id: parseInt(charityId),
      amount_raised: charityTotals[charityId].amount_raised,
      charity_icon: charityTotals[charityId].charity_icon
    };
  });


  const userTotals = {}

  donations.forEach(donation => {
    const userId = donation.user_id
    const amountDonated = donation.amount_donated
    const userImg = donation.user.user_icon

    if(userTotals[userId]) {
      userTotals[userId].amount_raised += amountDonated
    } else {
      userTotals[userId] = {
        amount_raised: amountDonated,
        user_icon: userImg
      }
    }
  })
  const userAmountsArray = Object.keys(userTotals).map(userId => {
    return {
      user_id: parseInt(userId),
      amount_raised: userTotals[userId].amount_raised,
      user_icon: userTotals[userId].user_icon
    }
  })


  return (
    <div>
      <NavBar 
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}

        charityLoggedIn={charityLoggedIn}
        setCharityLoggedIn={setCharityLoggedIn}

        selectCharity={selectCharity}
        setSelectCharity={setSelectCharity}

        selectUser={selectUser}
        setSelectUser={setSelectUser}

        selectBlogs={selectBlogs}
        setSelectBlogs={setSelectBlogs}

        selectUserSignUp={selectUserSignUp}
        setSelectUserSignUp={setSelectUserSignUp}

        selectUserSignIn={selectUserSignIn}
        setSelectUserSignIn={setSelectUserSignIn}

        selectCharitySignUp={selectCharitySignUp}
        setSelectCharitySignUp={setSelectCharitySignUp}

        selectCharitySignIn={selectCharitySignIn}
        setSelectCharitySignIn={setSelectCharitySignIn}

        user={user}
        setUser={setUser}

        charity={charity}
        setCharity={setCharity}
      />

      <Outlet context={
      {
        charities: charities,
        setCharities: setCharities,

        users: users, 
        setUsers: setUsers,

        blogs: blogs, 
        setBlogs: setBlogs,

        reviews: reviews,
        setReviews: setReviews,

        donations: donations, 
        setDonations: setDonations,

        setSelectCharitySignUp: setSelectCharitySignUp,

        setSelectUserSignUp: setSelectUserSignUp,

        charityAmountsArray: charityAmountsArray,

        userAmountsArray: userAmountsArray,

        setSelectBlogs: setSelectBlogs,

        setSelectCharity: setSelectCharity,

        setSelectUser: setSelectUser,

        userLoggedIn: userLoggedIn,

        user: user,
        onLogin: setUser,

        setUserLoggedIn: setUserLoggedIn,

        charityLoggedIn: charityLoggedIn,
        setCharityLoggedIn: setCharityLoggedIn,

        charity: charity,
        onCharityLogin: setCharity
      }
    }
      
    />
    </div>
   
  )
}
export default App








