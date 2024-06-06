import App from "./components/App";
import Home from "./Pages/Home";
import CharitiesPage from "./Pages/CharitiesPage";
import BlogPost from "./Pages/BlogPost";
import User from "./Pages/User";
import UsersHome from "./Pages/UsersHome";
import BlogsHome from "./Pages/BlogsHome";
import UserSignUpSignIn from "./Pages/UserSignUpSignIn";
import CharitiesHome from "./Pages/CharitiesHome";
import UserSignIn from "./Pages/UserSignIn";
import CharitySignUp from "./Pages/CharitySignUp";
import CharitySignIn from "./Pages/CharitySignIn";

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
                element: <CharitiesHome />
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
                path: "/usersignup", 
                element: <UserSignUpSignIn />
            },
            {
                path: "/usersignin",
                element: <UserSignIn />
            },
            {
                path: "/charitysignup",
                element: <CharitySignUp />
            },
            {
                path: "/charitysignin",
                element: <CharitySignIn />
            }
        ]
    }
]

export default routes