// import React from "react";
// import App from "./components/App";
// import "./index.css";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.js";
import "./index.css"

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
