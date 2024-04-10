import "./App.css";
import React, { createContext, useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import VerticalNavbar from "./compoent/VerticalNavbar";
import SearchBar from "./compoent/SearchBar";
import TableDataContent from "./compoent/TableDataContent";
import EditDataContent from "./compoent/EditDataContent";
import Form from "./compoent/Form";
import LoginPage from "./Page/LoginPage";
import ProfileBar from "./compoent/ProfileBar";
import PasswordSetPage from "./Page/PasswordSetPage"; // Load environment variables from .env file
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const UserStateContext = createContext();

function App() {
  const [userState, setUserState] = useState(null); // login?
  // let myRole = "";
  // if (userState) {
  //   console.log(userState.Role);
  //   myRole = userState.Role;
  //   console.log(userState.Role);
  // }

  const [result, setResult] = useState([]);

  const [userInfo, setUserInfo] = useState(null);
  const [enableAssignPage, setEnableAssignPage] = useState(false); // login?
  useEffect(() => {
    try {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.log("Cookie_token not found");
      } else {
        // use api login user by sent mail and google token for verify
        const authToken = Cookies.get("authToken");
        const decodedToken = jwt_decode(authToken);
          
        if (decodedToken) {
          console.log(decodedToken)
          setUserState(decodedToken);
    


        } else {
          console.log("Token expired or Token not found or Token invalid");
          const googleToken = localStorage.getItem("accessToken");
          if (googleToken) {
            localStorage.removeItem("accessToken");
          }
          Cookies.remove("authToken");
        }
      }
    } catch (e) {
      console.log(e);
      const authToken = Cookies.get("authToken");
      const googleToken = localStorage.getItem("accessToken");
      if (authToken) {
        Cookies.remove("authToken");
      }
      if (googleToken) {
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  return (
    <UserStateContext.Provider value={{ userState, setUserState }}>
      {userState ? (
        <div>
          { userState.Role == "admin" ? <VerticalNavbar /> : console.log("Usedwr")}
          <Form />
          <div className="content">
            <div className="top_container">
              <SearchBar setResult={setResult} />
              <ProfileBar user_email={userState.Mail} />
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
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                setEnableAssignPage={setEnableAssignPage}
              />
            }
          />
          {enableAssignPage ? (
            <Route
              path="/setPassword"
              element={<PasswordSetPage userInfo={userInfo} />}
            />
          ) : null}
        </Routes>
      )}
    </UserStateContext.Provider>
  );
}

export { UserStateContext };

export default App;
