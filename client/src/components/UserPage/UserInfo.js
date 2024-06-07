import "./UserInfo.css"

function UserInfo({userImg, userName, userCheck}){
    return(
        <div className="userInfoGrid">
            <img className="userImg" src={userImg}/>
            <h1>{userName}</h1>
            {userCheck? 
                <div className="ownUserButtons">
                    <button className="userBlogCreate">Create a New Blog</button>
                </div>
                :
                null
            }
        </div>
    )
    // return(
    //     <div className="userInfoGrid">
    //         <div className="userImgContainer">
    //             <img className="userImg" src={userImg}/>
    //         </div>

    //         <div className="userContainer">
    //             <h1 className="userName">{userName}</h1>
    //         </div>

    //         {userCheck? 
    //             <div>
    //                 <button className="userBlogCreateButton">Write New Blog Post</button>
    //             </div>
    //             :
    //             null
    //         }
    //     </div>
    // )
}
export default UserInfo