import React, { useState } from "react";
import SearchBar from "../compoent/SearchBar";
import TableDataContent from "../compoent/TableDataContent";
import "../App.css";
function MainPage() {
  const [result, setResult] = useState([]);
  return (
    <div className="content">
      <SearchBar setResult={setResult} />
      <TableDataContent result={result} />
    </div>
  );
}

export default MainPage;
