import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CategoryGrid from "./components/CategoryGrid";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { NavLink } from "react-router-dom";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";

function App() {
  return (
    <>
      <nav>
        <ul className="nav">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-item"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-item"
              }
              to="/level1"
            >
              Level 1
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-item"
              }
              to="/level2"
            >
              Level 2
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-item"
              }
              to="/level3"
            >
              Level 3
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<CategoryGrid />} />
      </Routes>
    </>
  );
}

export default App;
