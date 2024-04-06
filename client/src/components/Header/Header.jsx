import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth  h-container">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            {/* 
            {isAuthenticated && <NavLink to="/favourites">Favourites</NavLink>}

            {isAuthenticated && <NavLink to="/bookings">Bookings</NavLink>} */}

            <a href="mailto:hp85247@gmail.com">Contact</a>
            {/* login button  */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <NavLink
                onClick={() => {
                  localStorage.clear();
                  logout();
                }}
                style={{ fontWeight: "bold" }}
              >
                Logout
              </NavLink>
            )}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => {
            setMenuOpened((prev) => !prev);
          }}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
