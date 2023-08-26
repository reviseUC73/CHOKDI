import "./App.css";
import React, { Fragment, useState } from "react";

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
import TableData from "./compoent/TableData";
import EditData from "./compoent/EditData";
function App() {
  const [result, setResult] = useState([]);

  return (
    <Fragment>
      <VerticalNavbar />
      <div className="content">
        <SearchBar setResult={setResult} />
        <Routes>
          <Route path="/" element={<TableData result={result} />} />
          <Route path="/edit" element={<EditData result={result} />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
