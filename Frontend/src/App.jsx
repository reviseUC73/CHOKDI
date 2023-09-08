import "./App.css";
import React, { Fragment, createContext, useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import VerticalNavbar from "./compoent/VerticalNavbar";
import SearchBar from "./compoent/SearchBar";
import TableDataContent from "./compoent/TableDataContent";
import EditDataContent from "./compoent/EditDataContent";
import Form from "./compoent/Form";
import LoginPage from "./Page/LoginPage";

// import { GoogleOAuthProvider } from '@react-oauth/google';

const WebContext = createContext();
function App() {
  const [result, setResult] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  // useEffect(setAccessToken, [accessToken]);
  // console.log(jwt_decode(accessToken).email);
  // console.log(accessToken);
  // const setAccessToken = () => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       localStorage.removeItem("access_token");
  //       localStorage.removeItem("refresh_token");
  //     }
  //   }
  // };

  const handleOnClick_Logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
    // localStorage.removeItem("refresh_token");
  };
  return (
    <Fragment>
      {accessToken ? (
        <WebContext.Provider value={{ buttonStatus, setButtonStatus }}>
          <VerticalNavbar />
          <Form />
          <div className="content">
            <div className="top_container">
              <SearchBar setResult={setResult} />
              <div>{jwt_decode(accessToken).email}</div>
              <button onClick={handleOnClick_Logout}>LogOut</button>{" "}
            </div>
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
