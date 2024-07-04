import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthProvider";

export default function HeaderComponent() {
  const context = useAuth();

  function handleLogout() {
    useAuth.logout();
  }
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a
              className="navbar-brand ms-2 fs-2 fw-bold text-black"
              href="https://www.github.com/pmukesh31"
            >
              Mukesh
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                {context.isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to="/welcome/mukesh">
                      Home
                    </Link>
                  </li>
                )}
                {context.isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                {!context.isAuthenticated && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item fs-5">
                {context.isAuthenticated && (
                  <Link
                    className="nav-link"
                    onClick={handleLogout}
                    to="/logout"
                  >
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
