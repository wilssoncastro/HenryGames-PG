import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";


export default function burger() {
  return (
    <div className="burger">  
        <Link to='#' className="menu-bars">
            <FaIcons.FaBars />
        </Link>
    </div>
  )
}
