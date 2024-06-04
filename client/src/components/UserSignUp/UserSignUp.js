import { useState } from "react";
import "./UserSignUp.css"

import { useFormik } from "formik";

function UserSignUp(){

    const [refreshPage, setRefreshPage] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            user_icon: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if(res.status == 200) {
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })
    return(
        <form>
            <div className="emailSignUp">
                <label className="emailLabel">Email Address</label>
                <input 
                    className="emailSignUpInput"
                    type="text"
                    placeholder="Please Enter Your Email Address"
                />
            </div>

            <br/>

            <div className="userNameSignUp">
                <label className="userNameLabel">Username</label>
                <input 
                    className="userNameSignupInput"
                    type="text"
                    placeholder="Please Enter Desired Username"
                />
            </div>
        </form>
    )
}
export default UserSignUp