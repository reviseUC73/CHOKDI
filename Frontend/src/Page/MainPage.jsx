import React, { useState } from "react";
import SearchBar from "../compoent/SearchBar";
import TableData from "../compoent/TableData";
import "../App.css";
function MainPage() {
  const [result, setResult] = useState([]);
  return (
    <div className="content">
      <SearchBar setResult={setResult} />
      <TableData result={result} />
    </div>
  );
}

export default MainPage;
