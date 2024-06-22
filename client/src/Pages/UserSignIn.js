import { useState } from "react"
import "./UserSignIn.css"
import { useNavigate, useOutletContext } from "react-router-dom"

// function UserSignIn({onLogin}){
function UserSignIn(){
    const[usernameInput, setUsernameInput] = useState("")
    const[userPassword, setUserPassword] = useState("")
    const[failedLogin, setFailedLogin] = useState(false)
    const[showPassword, setShowPassword] = useState(false)

    const appData = useOutletContext()

    const onLogin = appData.onLogin
    const users = appData.user
    
    const setUserLoggedIn = appData.setUserLoggedIn

    const navigate = useNavigate()

    const handlePassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/userlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usernameInput, userPassword }),
        }).then((r) => {
            if (r.ok) {
                return r.json()
            } else {
                setFailedLogin(true)
            }
        })
        .then((user) => {
            if (user) {
                console.log(users)
                onLogin(user)
                setUserLoggedIn(true)
                navigate("/")
            }
        })
    }
    console.log(users)

    return(
        <div className="userLoginPage">
            {failedLogin?
                <div className="failedLogin">
                    <h1>Failed Login</h1>
                    <h3>Username and/or Password are Incorrect</h3>
                    <h3>Please Try Again</h3>
                </div>
                :
                null
            }

            <form onSubmit={handleSubmit} className="userLoginForm">
                <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="userNameText"
                    placeholder="Enter Users Name"
                />
                <br/>
                <div className="passwordSelection">
                    <input 
                        type={showPassword? "text" : "password"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="userPasswordText"
                        placeholder="Enter Charities Password"
                    />
                    <button onClick={handlePassword} className="userPasswordButton">
                        <h3>👁️</h3>
                    </button>
                </div>
                <br/>
                <button type="submit" className="userLoginButton">User Login</button>
            </form>
        </div>
    )
}
export default UserSignIn

// import { useState } from "react"
// import "./UserSignIn.css"
// import { useOutletContext } from "react-router-dom"
// import { useNavigate } from "react-router-dom";

// function UserSignIn(){

//     const navigate = useNavigate()

//     const appData = useOutletContext()
    
//     const userLogin = appData.userLogin
//     const setUserLogin = appData.setUserLogin

//     const setLoggedInUser = appData.setLoggedInUser

//     const [username, setUsername] = useState("")
//     const [userPassword, setUserPassword] = useState("")
//     const [showPassword, setShowPassword] = useState(false)
//     const [failedLogin, setFailedLogin] = useState(false)

//     const handlePassword = (e) => {
//         e.preventDefault()
//         setShowPassword(!showPassword)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         fetch('/userlogin', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({username, userPassword}),
//         })
//         .then((r) => {
//             console.log(r)
//             if(r.ok) {
//                 setUserLogin(!userLogin)
//                 navigate("/")
//                 return r.json()
//             } else {
//                 setFailedLogin(true)
//                 throw new Error("Invalid login")
//             }
//         })
//         .then((user) => {
//             console.log(user)
//             setLoggedInUser(user)
//         })
//         .catch((error) => console.error(error))
//     }

//     return(
//         <div className="userLoginPage">
//             {failedLogin?
//                 <div className="failedLogin">
//                     <h1>Failed Login</h1>
//                     <h3>Username and/or Password are Incorrect</h3>
//                     <h3>Please Try Again</h3>
//                 </div>
//                 :
//                 null
//             }
//             <form onSubmit={handleSubmit} className="userLoginForm">
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="userNameText"
//                     placeholder="Enter Users Name"
//                 />
//                 <br/>
//                 <div className="passwordSelection">
//                     <input 
//                         type={showPassword? "text" : "password"}
//                         value={userPassword}
//                         onChange={(e) => setUserPassword(e.target.value)}
//                         className="userPasswordText"
//                         placeholder="Enter Charities Password"
//                     />
//                     <button onClick={handlePassword} className="userPasswordButton">
//                         <h3>👁️</h3>
//                     </button>
//                 </div>
//                 <br/>
//                 <button type="submit" className="userLoginButton">User Login</button>
//             </form>
//         </div>
//     )
// }
// export default UserSignIn