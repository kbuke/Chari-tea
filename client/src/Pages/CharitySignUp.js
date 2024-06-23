import "./CharitySignUp.css"
import { useNavigate, useOutletContext } from "react-router-dom"

import { useFormik } from "formik"
import * as yup from "yup"

function CharitySignUp(){
    const appData = useOutletContext()

    const charities = appData.charities

    const setCharities = appData.setCharities

    const setSelectCharitySignUp = appData.setSelectCharitySignUp

    console.log(charities)

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        charityName: yup.string()
            .min(1, "Charity name must be at least 1 character")
            .max(20, "Charity Name must not be longer than 20 characters")
            .required("Must Enter Charity Name"),
            //Try and ensure that the username is unique
        
        charityDescription: yup.string()
            .min(10, "Charity Description must be at least 10 characters")
            .max(50, "Charity Description can not be more than 50 characthers")
            .required("Must Enter a Charity Description"),
        
        charityLocation: yup.string()
            .required("Must enter Charities location"),
        
        charityPassword: yup.string()
            .min(6, "Password must be atleast 6 characters long")
            .max(20, "Password can not be more than 20 characters")
            .required("Must enter a password"),

        charityIcon: yup.string()
            .required("Must Submit a Charity Icon")
    })

    const formik = useFormik({
        initialValues: {
            charityName: "",
            charityDescription: "",
            charityLocation: "",
            charityPassword: "",
            charityIcon: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/charities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => {
                if(res.status === 201) {
                    return res.json()
                }
                throw new Error("Failed to create charity")
            })
            .then(newCharity => setCharities([...charities, newCharity]))
            setSelectCharitySignUp(false)
            navigate("/")
        }
    })

    return(
        <div className="charitySignUpPage">
            <h1>Charity Sign Up</h1>
            <h2>Already have an account? Click Here</h2>
            <>
                <form onSubmit={formik.handleSubmit} className="charitySignUpForm">
                    <input
                        type="text"
                        name="charityName"
                        className="charityNameSignUp"
                        value={formik.values.charityName}
                        onChange={formik.handleChange}
                        placeholder="Enter Charity Name"
                    />
                    {formik.errors.charityName && <div className="charityNameError">{formik.errors.charityName}</div>}
                    <br/>
                    <input
                        type="password"
                        name="charityPassword"
                        className="charityPasswordSignUp"
                        value={formik.values.charityPassword}
                        onChange={formik.handleChange}
                        placeholder="Enter Charities Password"
                    />
                    {formik.errors.charityPassword && <div className="charityPasswordError">{formik.errors.charityPassword}</div>}
                    <br/>
                    <input
                        type="text"
                        name="charityDescription"
                        className="charityDescritptionText"
                        value={formik.values.charityDescription}
                        onChange={formik.handleChange}
                        placeholder="Enter Charity Description"
                    />
                    {formik.errors.charityDescription && <div className="charityDescriptionError">{formik.errors.charityDescription}</div>}
                    <br/>
                    <input
                        type="text"
                        name="charityLocation"
                        className="charityLocationText"
                        value={formik.values.charityLocation}
                        onChange={formik.handleChange}
                        placeholder="Enter Charities Location, e.g. London UK"
                    />
                    {formik.errors.charityLocation && <div className="charityLocationError">{formik.errors.charityLocation}</div>}
                    <br/>
                    <input 
                        type="text"
                        name="charityIcon"
                        className="charityIconText"
                        value={formik.values.charityIcon}
                        onChange={formik.handleChange}
                        placeholder="Submit an image for Charities Icon"
                    />
                    {formik.errors.charityIcon && <div className="charityIconError">{formik.errors.charityIcon}</div>}
                    <br/>
                    <button type="submit" className="charitySignUpSubmit">Register New Charity</button>
                </form>
            </>
        </div>
    )
}
export default CharitySignUp


