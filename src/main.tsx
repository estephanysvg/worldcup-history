// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Components
import { MantineProvider } from "@mantine/core";
import { router } from "./router";

// Styles
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "@mantine/charts/styles.css";

// #region Root

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <RouterProvider router={router} />
        </MantineProvider>
    </StrictMode>
);

// #endregion