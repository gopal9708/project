import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Spinner } from "reactstrap";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const loading = (
  <div className="pt-3 text-center">
    {/* <div className="sk-spinner sk-spinner-pulse">loading...</div> */}
    <Spinner type="border" className="ms-2" color="primary" />
    <div>loading...</div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>
);

reportWebVitals();
