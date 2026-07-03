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
import { checkAuth } from "./Services/Api"; // สมมติว่าคุณสร้างฟังก์ชันนี้ใน Api.js

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        // API call นี้จะแนบ httpOnly cookie ไปโดยอัตโนมัติ
        // (ถ้าตั้งค่า withCredentials: true ใน axios)
        const response = await checkAuth(); // เรียก API ที่เราสร้างขึ้นใหม่
        setUserState(response.data);
        console.log("Session valid:", response.data);
      } catch (error) {
        console.log("No active session found.");
        setUserState(null);
        // อาจจะเคลียร์ token ที่ไม่เกี่ยวข้องอื่นๆ ออกไป
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // หรือแสดง Spinner สวยๆ
  }

  return (
    <UserStateContext.Provider value={{ userState, setUserState }}>
      {userState ? (
        <div>
          {userState.Role == "admin" ? (
            <VerticalNavbar />
          ) : (
            console.log("Usedwr")
          )}
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
