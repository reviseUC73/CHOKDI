import "./App.css";
import React, { Fragment, createContext, useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import VerticalNavbar from "./compoent/VerticalNavbar";
import SearchBar from "./compoent/SearchBar";
import TableDataContent from "./compoent/TableDataContent";
import EditDataContent from "./compoent/EditDataContent";
import Form from "./compoent/Form";
import LoginPage from "./Page/LoginPage";
import { TokenDecodeGOOGLE } from "./Services/Api";
import ProfileBar from "./compoent/ProfileBar";
import PasswordSetPage from "./Page/PasswordSetPage"; // Load environment variables from .env file
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// require("dotenv").config()
function App() {
  const [result, setResult] = useState([]);

  const [accessToken, setAccessToken] = useState(null);

  // useEffect(async () => {
  //   // const token_g = localStorage.getItem("accessToken");
  //   const authToken = Cookies.get("authToken");
  //   // const decode = TokenDecode
  //   if (token_g) {
  //     const decode_ = async (my_token) => {
  //       try {
  //         const decoder = await TokenDecodeGOOGLE(my_token);
  //         console.log(decoder);
  //         if (decoder) {
  //           setAccessToken(decoder);
  //           // api login user by sent mail and google token for verify
  //         }
  //       } catch (e) {
  //         console.log(e);
  //         localStorage.removeItem("accessToken");
  //         window.location.reload();
  //       }
  //     };
  //     // console.log(token);
  //     decode_(token_g);
  //   }
  // }, []);

  useEffect(() => {
    try {
      const authToken = Cookies.get("authToken");
      console.log(authToken);

      if (!authToken) {
        console.log("token not found");
      } else {
        // use api login user by sent mail and google token for verify
        const authToken = Cookies.get("authToken");
        const decodedToken = jwt_decode(authToken);

        if (decodedToken) {
          console.log("DecodedToken : ", decodedToken);
          setAccessToken(decodedToken);
          // window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
      Cookies.remove("authToken");
    }
  }, []);


  return (
    <Fragment>
      {accessToken ? (
        <div>
          <VerticalNavbar />
          <Form />
          <div className="content">
            <div className="top_container">
              <SearchBar setResult={setResult} />
              <ProfileBar user_email={accessToken.Mail} />
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
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/setPassword"
            element={<PasswordSetPage email={"rew"} />}
          />
        </Routes>
      )}
    </Fragment>
  );
}

export default App;
