import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import "./css/style.css"
import "./css//variables.css"
import UserProvider from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <Suspense fallback={<p>Loading...</p>}>
            <RouterProvider router={router} />
        </Suspense>
    </UserProvider>
)
