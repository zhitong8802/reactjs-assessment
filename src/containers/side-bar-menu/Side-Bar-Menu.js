import React from "react";
import "./Side-Bar-Menu.css";
import { Link } from 'react-router-dom';

const SideBarMenu = () => {
    return (
        <div className="sidenav">
            <Link to="/Profile" >My Profile</Link>
            <Link to="/change" >Change Password</Link>
            <Link to="/Carlist" >Car List</Link>
        </div>
    )
};
  
export default SideBarMenu;

