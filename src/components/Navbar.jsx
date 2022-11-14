import { useAuth0, User } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="navbar-container flex">
      <div className="container flex">
        <h1>EndPoint</h1>
        <div className="navbar-right">
          <NavLink className="navLink" to="/">
            Blogs
          </NavLink>
          {isAuthenticated && (
            <NavLink className="navLink" to="/createBlogPost">
              Create blog
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink onClick={() => loginWithRedirect()} className="navLink">
              Login{" "}
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink
              onClick={() => logout({ returnTo: window.location.origin })}
              className="navLink"
            >
              Logout{" "}
            </NavLink>
          )}
          {isAuthenticated && <p className="userName">Hello, {user.name}</p>}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
