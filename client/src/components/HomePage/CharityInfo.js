import { useState } from "react"

import CharityBlogButton from "./CharityBlogButton"
import RenderedCharityBlogs from "./RenderedCharityBlogs"
import CharityButton from "./CharityButton"
import RenderedCharities from "./RenderedCharities"

import "./CharityInfo.css"

function CharityInfo({charities, charityBlogs}){

    const[charityBlogViews, setCharityBlogsViews] = useState(false)
    const[charityDonations, setCharityDonations] = useState(false)

    const handleCharityBlogs = () => {
        setCharityBlogsViews(!charityBlogViews)
    }

    const sortCharityBlogViews = charityBlogs.sort((a, b) => b.blog_views - a.blog_views)
    const fourCharityBlogViews = sortCharityBlogViews.slice(0, 4)

    // const sortCharityBlogDate = charityBlogs.sort((a, b) => b.blog_date - a.blog_date)
    // const fourCharityBlogDate = sortCharityBlogDate.slice(0, 4)
    const sortCharityBlogDate = charityBlogs.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))
    console.log(sortCharityBlogDate)
    const fourCharityBlogDate = sortCharityBlogDate.slice(0, 4)

    const renderedCharityBlogs = charityBlogViews? fourCharityBlogViews.map((blogs, index) => (
        <div key={index}>
            <RenderedCharityBlogs blogs={blogs}/>
        </div>
    ))
    :
    fourCharityBlogDate.map((blogs, index) => (
        <div key={index}>
            <RenderedCharityBlogs blogs={blogs}/>
        </div>
    ))

    //------------------------------------------------
    const handleCharityDonations = () => {
        setCharityDonations(!charityDonations)
    }

    const charityCopy = charities.slice()
    const sortCharitiesDatesDesc = charityCopy.sort((a, b) => new Date(b.charity_signup) - new Date(a.charity_signup))

    // const sortCharityDate = charities.sort((a, b) => b.charity_signup - a.charity_signup)
    const tenCharityDates = sortCharitiesDatesDesc.slice(0, 10)

    //create new attribute, total_donations
    charities.forEach(charity => {
        charity.total_donations = charity.donations.reduce((sum, donation) => sum + donation.amount_donated, 0);
    });

    const sortCharityDonations = charityCopy.sort((a, b) => b.total_donations - a.total_donations)
    const tenCharityDonations = sortCharityDonations.slice(0, 10)
    
    const renderedCharities = charityDonations? tenCharityDonations.map((charity, index) => (
        <div key={index}>
            <RenderedCharities charity={charity}/>
        </div>
    ))
    :
    tenCharityDates.map((charity, index) => (
        <div key={index}>
            <RenderedCharities charity={charity}/>
        </div>
    ))


    return(
        <div className="charityInfoHome">
            <div className="charityBlogHomeHeaderButton">
                <h2 className="charityBlogHomePageChoice">{charityBlogViews?`Most Popular Charity Blogs` : `Most Recent Charity Blogs`}</h2>
                <CharityBlogButton handleCharityBlogs={handleCharityBlogs} charityBlogViews={charityBlogViews}/>
            </div>
            <div className="homePageCharityBlogGrid">
                {renderedCharityBlogs}
            </div>

            <div className="charityHomeHeaderButton">
                <h2 className="charityHomePageChoice">{charityDonations?`Most Popular Charities` : `Charities Recently Registered on Chari-Tea`}</h2>
                <CharityButton charityDonations={charityDonations} handleCharityDonations={handleCharityDonations}/>
            </div>
            <div className="homePageCharityGrid">
                {renderedCharities}
            </div>
        </div>
    )
    
    
}
export default CharityInfo