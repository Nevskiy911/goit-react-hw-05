import { NavLink } from "react-router-dom";
import "../../styles/NavLink.css";

export default function Navigation() {
  return (
    <nav>
      <div className="main-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Movies
        </NavLink>
      </div>
    </nav>
  );
}
