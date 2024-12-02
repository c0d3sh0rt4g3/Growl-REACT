import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import Home from "../pages/Home/Home.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";

const Profile = lazy(() => import("../pages/Profile/Profile.jsx"))
const EditProfile = lazy(() => import("../pages/EditProfile/EditProfile.jsx"))
const Recipe = lazy(() => import("../pages/Recipe/Recipe.jsx"))
const NotFound  = lazy(() => import("../pages/NotFound/NotFound.jsx"))
const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage.jsx"))
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"))


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
                path: "/recipe/:id",
                element: <Recipe/>
            }
        ]
    },
    {
        path: "/search",
        element: <LayoutPrivate/>,
        children: [
            {
                index: true,
                element: <SearchPage/>
            }
        ]
    },
    {
        path: "/profile",
        element: <LayoutPrivate/>,
        children: [
            {
                index: "/profile",
                element: <Profile/>,
                children: [
                    {
                        path: "/profile/edit",
                        element: <EditProfile/>
                    }
                ]
            }
        ]
    }
])