import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./assets/css/font.css";
import "react-phone-input-2/lib/style.css";
import "rc-slider/assets/index.css";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-perfect-scrollbar/dist/css/styles.css";
import { PersistGate } from "redux-persist/es/integration/react"
import { persistStore } from "redux-persist";
import BusinessHourPopup from "./component/Popups/DashboardPopup/BusinessHourPopup";
import CallHistory from "./component/Sidebar/CallHistory";
import CallHistoryPage from "./component/Call/CallHistoryPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store)



root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    <ToastContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
