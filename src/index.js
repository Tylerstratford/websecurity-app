import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-6daneagnz64w0i82.us.auth0.com";
const clientId = "fBXMLm2UL1xw3O1JGhXy213dixWIuVRL";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        audience="https://dev-6daneagnz64w0i82.us.auth0.com/api/v2/"
        scope='read:current_user update:current_user_metadata'
      >
        <App />
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);
