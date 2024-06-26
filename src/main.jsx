import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap";

import "./assets/css/main.css"
import Routing from "./router/routing.config"
import ThemeProvider from "./config/theme.context";
import { Provider } from "react-redux";
import store from "./store";


const rootElem = ReactDOM.createRoot(document.getElementById('root'))
rootElem.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <Routing />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)