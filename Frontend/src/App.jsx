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
import TableDataContent from "./compoent/TableDataContent";
import EditDataContent from "./compoent/EditDataContent";
import Form from "./compoent/Form";
function App() {
  const [result, setResult] = useState([]);

  return (
    <Fragment>
      <VerticalNavbar />
      <Form />
      <div className="content">
        <SearchBar setResult={setResult} />
        <Routes>
          <Route path="/" element={<TableDataContent result={result} />} />
          <Route path="/edit" element={<EditDataContent result={result} />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
