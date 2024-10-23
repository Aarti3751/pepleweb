import { Link, Outlet, useLocation } from "react-router-dom";
import '../Components/Sidebar.css';
import { BsGridFill } from "react-icons/bs";

const Sidebar = () => {
  const path = useLocation();
  const activePath = path.pathname;

  return (
    <div className="d-flex flex-row vh-100 private-container">
      <section id="sidebar" className="sidebar-container">
        <ul className="sidebar-list">
          {/* Overview Link */}
          <Link
            className={`sidebar-link ${activePath === "/user" ? "active" : ""}`}
            to={'/user'}
          >
            <li>
              <BsGridFill className="sidebar-icon" /> Overview
            </li>
          </Link>

          {/* People Directory Link */}
          <Link
            className={`sidebar-link ${activePath === "/user/dashboard" ? "active" : ""}`}
            to={'/user/dashboard'}
          >
            <li>
              <BsGridFill className="sidebar-icon" /> People Directory
            </li>
          </Link>
        </ul>
      </section>

      <section className="content-container flex-grow-1">
        <Outlet />
      </section>
    </div>
  );
};

export default Sidebar;
