import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic/LayoutPublic.jsx";
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home/Home.jsx";
import SearchPage from "../pages/SearchPage/SearchPage.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import Login from "../pages/Login/Login.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import EditAccount from "../pages/EditAccount/EditAccount.jsx";
import Recipe from "../pages/Recipe/Recipe.jsx";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <LayoutPublic/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/search",
                element: <SearchPage/>
            },
            {
                path: "/contact-us",
                element: <Contact/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/edit-account",
                element: <EditAccount/>
            },
            {
                path: "/recipe/:id",
                element: <Recipe/>
            }
        ]
    }
])