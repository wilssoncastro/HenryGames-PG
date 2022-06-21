import React from "react";
import { useState } from "react";
import * as VscIcons from "react-icons/vsc";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";


export default function Burger() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <div>
            <div className="burger">  
                <Link to='#' className="menu-bars">
                    <VscIcons.VscThreeBars />
                </Link>
            </div>
            <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                <ul className="side-menu-items">
                    <li className="sidebar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
