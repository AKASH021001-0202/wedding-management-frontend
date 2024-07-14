import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="container">
          <div className="navbar_main">
            <div className="navbar_icons">
       
              
              <Link className="navbar_icon">
                <Icons.TbMessage2 />
              </Link>
            
              <Link to={"/profile"} className="navbar_icon">
                <Icons.TbUser />
              </Link>
              <Link to={"/"} className="navbar_icon">
                <Icons.TbHome />
              </Link>
              <Link to={"/logout"} className="navbar_icon">
                <Icons.TbLogout />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
