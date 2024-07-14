import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import * as Icons from "react-icons/tb";
import Logo from "../../public/logo.png";
import axios from "axios"; // Import axios for HTTP requests
import { menu } from "../apis/menus.jsx";

const Sidebar = () => {
  const [toggle, setToggle] = useState(null); // State for main menu toggle
  const [toggleSub, setToggleSub] = useState(null); // State for submenu toggle
  const [sidebar, setSidebar] = useState(false); // State for sidebar toggle
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin status

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`
        );
        const users = response.data;
        const isAdminUser = users.some(user => user.is_vendor);
      
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error fetching isAdmin status
      }
    };

    fetchAdminStatus();
  }, []);

  // Function to handle main menu item click
  const handleMenuClick = (index) => {
    setToggle(index === toggle ? null : index); // Toggle the main menu item
    setToggleSub(null); // Close any open submenus
  };

  // Function to handle submenu item click
  const handleSubMenuClick = (index) => {
    setToggleSub(index === toggleSub ? null : index); // Toggle the submenu item
  };

  // Function to toggle the sidebar
  const handleSidebarToggle = () => {
    setSidebar(!sidebar); // Toggle sidebar state
  };

  return (
    <div className={`sidebar ${sidebar ? "active" : ""}`}>
      {/* Sidebar Profile */}
      <div className="sidebar_profile">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>

        <Link className="navbar_icon menu_sidebar" onClick={handleSidebarToggle}>
          <Icons.TbChevronsLeft className={`${sidebar ? "active" : ""}`} />
        </Link>
      </div>

      {/* Main Menu */}
      <ul className="menu_main">
        {menu.map((menuItem, index) => (
          // Render menu item only if isAdmin is true or if isAdmin is not defined for the menu item
          (menuItem.isAdmin === undefined || menuItem.isAdmin === isAdmin) && (
            <li key={index}>
              {/* Render NavLink if menu item has a URL */}
              {menuItem.url ? (
                <NavLink
                  to={menuItem.url}
                  className={`menu_link ${index === toggle ? "active" : ""}`}
                  onClick={() => handleMenuClick(index)}
                >
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                  {menuItem.subMenu && <Icons.TbChevronDown />}
                </NavLink>
              ) : (
                // Render div if menu item does not have a URL (i.e., is a placeholder)
                <div
                  className={`menu_link ${index === toggle ? "active" : ""}`}
                  onClick={() => handleMenuClick(index)}
                >
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                  {menuItem.subMenu && <Icons.TbChevronDown />}
                </div>
              )}

              {/* Submenu */}
              {menuItem.subMenu && index === toggle && (
                <ul className={`sub_menu ${index === toggle ? "active" : ""}`}>
                  {menuItem.subMenu.map((subMenuItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={`${menuItem.url}${subMenuItem.url}`}
                        className="menu_link"
                        onClick={() => handleSubMenuClick(subIndex)}
                      >
                        {subMenuItem.icon}
                        <span>{subMenuItem.name}</span>
                        {subMenuItem.subMenu && <Icons.TbChevronDown />}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
