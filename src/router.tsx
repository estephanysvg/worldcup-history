// Components
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

// #region Router

/**
* Main application router configuration using React Router.
* Configures the root route pointing to the Home page.
*/
export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />,
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
);
// #endregion
