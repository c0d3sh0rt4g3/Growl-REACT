import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
const NotFound  = lazy(() => import("../pages/NotFound/NotFound.jsx"))
import Home from "../pages/Home/Home.jsx";
import SearchPage from "../pages/SearchPage/SearchPage.jsx";
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"))
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import LayoutPrivate from "../layouts/LayoutPrivate.jsx";
const Profile = lazy(() => import("../pages/Profile/Profile.jsx"))
const EditProfile = lazy(() => import("../pages/EditProfile/EditProfile.jsx"))
const Recipe = lazy(() => import("../pages/Recipe/Recipe.jsx"))


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
                index: true,
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