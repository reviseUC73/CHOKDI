import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MainPage from "./Page/MainPage";
import VerticalNavbar from "./compoent/VerticalNavbar";
function App() {
  return (
    <>
      <div>
        <div className="nav">
        <VerticalNavbar />
        </div>
        <div className="contain">
        
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="edit" element={<Body_edit />} /> */}
            {/* <Route path="*" element={<Page404auth />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
