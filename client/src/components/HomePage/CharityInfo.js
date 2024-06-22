import { useState } from "react"

import RenderedCharities from "./RenderedCharities"
import RenderedCharityBlogs from "./RenderedCharityBlogs"
import CharityBlogButton from "./CharityBlogButton"
import CharityButton from "./CharityButton"

import "./CharityInfo.css"

function CharityInfo({
    charities, 
    charityBlogs,
    donations,
    sortCharityAmountsArray
}){

    console.log(charityBlogs)
    const [charityBlogDate, setCharityBlogDate] = useState(false)
    const [charitySignUpDate, setCharitySignUpDate] = useState(false)

    //Handle CharityBlogs

    //Toggle between dates and views
    const handleCharityBlogs = () => {
        setCharityBlogDate(!charityBlogDate)
    }

    //Sort by blog dates
    const charityBlogDates = charityBlogs.sort((a, b) => b.blog_date - a.blog_date)
    
    const fourCharityBlogDates = charityBlogDates.slice(0, 4)
    console.log(fourCharityBlogDates)

    //Sort by blog views
    const charityBlogViews = charityBlogs.sort((a, b) => b.blog_views - a.blog_views)
    const fourCharityBlogViews = charityBlogViews.slice(0, 4)

    const renderedCharityBlogs = charityBlogDate ? fourCharityBlogDates.map((blog, index) => (
        <div key={index}>
            <RenderedCharityBlogs blogs={blog}/>
        </div>
    ))
    :
    fourCharityBlogViews.map((blog, index) => (
        <div key={index}>
            <RenderedCharityBlogs blogs={blog}/>
        </div>
    ))

    //--------------------------------------------------------------------------------------------------

    //Handle Charities

    //Toggle between dates and donations
    const handleCharities = () => {
        setCharitySignUpDate(!charitySignUpDate)
    }

    //Sort by how much donated

    const tenCharityDonations = sortCharityAmountsArray.slice(0, 10)

    //Sort charities by date
    const charityDate = charities.sort((a, b) => new Date(b.charity_signup) - new Date(a.charity_signup))
    const tenCharityDates = charityDate.slice(0, 10)
    
    //Decide which charities are rendered
    const renderedCharities = charitySignUpDate ? tenCharityDates.map((charity, index) => (
        <div key={index}>
            <RenderedCharities charity={charity} id={charity.id}/>
        </div>
    ))
    :
    tenCharityDonations.map((charity, index) => (
        <div key={index}>
            <RenderedCharities charity={charity} id={charity.charity_id}/>
        </div>
    ))

    return(
        <div className="charityInfoHome">
            <div className="charityBlogHomeHeaderButton">
                <h2 className="charityBlogHomePageChoice">{charityBlogDate ? "Most Recent Charity Blogs" : "Most Popular Charity Blogs"}</h2>
                <CharityBlogButton 
                    handleCharityBlogs={handleCharityBlogs}
                    charityBlogDate={charityBlogDate}
                />
            </div>
            <div className="homePageCharityBlogGrid">
                {renderedCharityBlogs}
            </div>

            <div className="charityHomeHeaderButton">
                <h2 className="charityHomePageChoice">{charitySignUpDate ? "New Charities to Charitea" : "Show Most Popular Charities"}</h2>
                <CharityButton 
                    handleCharities={handleCharities}
                    charitySignUpDate={charitySignUpDate}
                />
            </div>

            <div className="homePageCharityGrid">
                {renderedCharities}
            </div>
        </div>
    )
}
export default CharityInfo