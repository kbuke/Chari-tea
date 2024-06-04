import App from "./components/App";
import Home from "./Pages/Home";
import CharityHome from "./Pages/CharityHome";
import CharitiesPage from "./Pages/CharitiesPage";
import BlogPost from "./Pages/BlogPost";
import User from "./Pages/User";
import UsersHome from "./Pages/UsersHome";
import BlogsHome from "./Pages/BlogsHome";
import UserSignUpSignIn from "./Pages/UserSignUpSignIn";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/charities",
                element: <CharityHome />
            },
            {
                path: "/charities/:id",
                element: <CharitiesPage />
            },
            {
                path: "/blogpost/:id",
                element: <BlogPost />
            },
            {
                path: "/users/:id",
                element: <User />
            },
            {
                path: "/users",
                element: <UsersHome />
            },
            {
                path: "/blogs",
                element: <BlogsHome />
            },
            {
                path: "/signup", 
                element: <UserSignUpSignIn />
            }
        ]
    }
]

export default routes