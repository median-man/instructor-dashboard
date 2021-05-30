import { Link } from "react-router-dom";
import { useBcs } from "./bcs";

function TopBar() {
  const { isLoggedIn, signOut } = useBcs();
  return (
    <header className="navbar navbar-expand navbar-dark bg-dark shadow">
      <Link className="navbar-brand px-3" to="/">
        Instructor Dashboard
      </Link>
      <div className="navbar-nav px-3 ms-auto">
        <div className="nav-item">
          {isLoggedIn && (
            <button className="nav-link bg-dark btn" onClick={signOut}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
