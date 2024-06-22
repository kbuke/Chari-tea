import { useNavigate } from 'react-router-dom'
import './CharityLogo.css'

function CharityLogo({
    charityName,
    charityLogo,
    charityLocation,
    charityDescription,
    charitySignUp,
    charityId,
    loggedInCharityId
}){ 
    const charitySignUpDate = charitySignUp? charitySignUp.slice(0, 10) : null

    const navigate = useNavigate()

    const navBlog = () => {
        navigate('/newblog')
    }

    const writeCharityBlog = loggedInCharityId === charityId ?
        <button className='writeCharityBlog' onClick={navBlog}>
            Write New Blog
        </button>
        :
        null

    return(
        <>
            <div className='charityLogoContainer'>
                <img 
                    className='charityLogo' 
                    src={charityLogo}
                    alt='charityLogo'
                />
                <h1 className='charityName'>{charityName}</h1>
                <h2 className='charityLocation'>📍 {charityLocation}</h2>
                <h3 className='charityDescription'>{charityDescription}</h3>
                <h3 className='charitySignUpDate'>Joined: {charitySignUpDate}</h3>
                {writeCharityBlog}
            </div>
        </>
    )
}
export default CharityLogo

