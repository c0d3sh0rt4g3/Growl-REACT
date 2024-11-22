import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic/LayoutPublic.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Home from "../pages/Home/Home.jsx";
import SearchPage from "../pages/SearchPage/SearchPage.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import EditProfile from "../pages/EditProfile/EditProfile.jsx";
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
                path: "/signin",
                element: <SignIn/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "/profile",
                element: <Profile/>,
                children: [
                    {
                        path: "/profile/edit",
                        element: <EditProfile/>
                    }
                ],
            },
            {
                path: "/recipe/:id",
                element: <Recipe/>
            }
        ]
    }
])