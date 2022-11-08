import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from 'react-router-dom'

function Navbar() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    return loginWithRedirect
  }
  return (
    <div className="navbar-container">
      <div className="container flex">
        <h1>EndPoint</h1>
        <div className="navbar-right">
          <NavLink className="navLink" to="/">Blogs</NavLink>
          <NavLink className="navLink" to="/createBlogPost">Create blog</NavLink>
          <NavLink onClick={LoginButton()} className="navLink">Login</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
