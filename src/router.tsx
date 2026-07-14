import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
// import MatchDetail from "./pages/MatchDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    // {
    //     path: "/match/:id",
    //     element: <MatchDetail />,
    // },
]);