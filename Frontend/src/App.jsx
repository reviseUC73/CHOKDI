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
import { TokenDecodeGOOGLE } from "./Services/Api";
import ProfileBar from "./compoent/ProfileBar";
import PasswordSetPage from "./Page/PasswordSetPage";


function App() {
  const [result, setResult] = useState([]);

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // const decode = TokenDecode
    if (token) {
      const decode_ = async (my_token) => {
        try {
          const decoder = await TokenDecodeGOOGLE(my_token);
          // console.log(decoder);
          if (decoder) {
            setAccessToken(decoder);
          }
        } catch (e) {
          console.log(e);
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      };
      // console.log(token);
      decode_(token);
    }
  }, []);

  const handleOnClick_Logout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  return (
    <Fragment>
      {accessToken ? (
        // <WebContext.Provider value={{ buttonStatus, setButtonStatus }}>
        <div>
          <VerticalNavbar />
          <Form />
          <div className="content">
            <div className="top_container">
              <SearchBar setResult={setResult} />
              <ProfileBar user={accessToken.data.email} />
              {/* <div className="profile-btn">{accessToken.data.email}</div> */}
              {/* <a href="/">
                <button onClick={handleOnClick_Logout}>LogOut</button>{" "}
              </a> */}
            </div>
            <Routes>
              <Route path="/" element={<TableDataContent result={result} />} />
              <Route
                path="/edit"
                element={<EditDataContent result={result} />}
              />
            </Routes>
          </div>
        </div>
      ) : (
        // </WebContext.Provider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/setPassword" element={<PasswordSetPage  email={"rew"}/>} />
          {/* <Route path="/login2" element={<LoginPage2 />} /> */}
        </Routes>
      )}
    </Fragment>
  );
}

export default App;
