import "./BlogContent.css"

function BlogContent({
    blogContent,
    blogTitle,
    authorName
}) {
    return(
        <div className="renderedBlog">
            <div className="blogTitleInfo">
                <h1 className="blogTitle">{blogTitle}</h1>
                <h4 className="publishedInfo"> Published By <cite>{authorName}</cite></h4>
            </div>
            <div className="renderedBlogContent">
                {blogContent}
            </div>
        </div>
    )
}
export default BlogContent