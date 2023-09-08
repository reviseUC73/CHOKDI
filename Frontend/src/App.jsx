import "./App.css";
import React, { Fragment, createContext, useState } from "react";
// import "./Page/Login.css";
// import "./Page/Login2.css";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MainPage from "./Page/MainPage";

import VerticalNavbar from "./compoent/VerticalNavbar";
import SearchBar from "./compoent/SearchBar";
import TableDataContent from "./compoent/TableDataContent";
import EditDataContent from "./compoent/EditDataContent";
import Form from "./compoent/Form";
import LoginPage from "./Page/LoginPage";
import { faL } from "@fortawesome/free-solid-svg-icons";
// import LoginPage2 from "./Page/LoginPage2";

const WebContext = createContext();
function App() {
  const [result, setResult] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  return (
    <Fragment>
      {accessToken ? (
        <WebContext.Provider value={{ buttonStatus, setButtonStatus }}>
          <VerticalNavbar />
          <Form />
          <div className="content">
            <SearchBar setResult={setResult} />
            <Routes>
              <Route path="/" element={<TableDataContent result={result} />} />
              <Route
                path="/edit"
                element={<EditDataContent result={result} />}
              />
            </Routes>
          </div>
        </WebContext.Provider>
      ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/login2" element={<LoginPage2 />} /> */}

          </Routes>
      )}
    </Fragment>
  );
}

export default App;
