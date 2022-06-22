import React from "react";
import { useState } from "react";
import * as VscIcons from "react-icons/vsc";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import './burger.css';
import { IconContext } from "react-icons/lib";


export default function Burger() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <div>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="burger">  
                    <Link to='#' >
                        <VscIcons.VscThreeBars className="menu-bars" onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                    <ul className="side-menu-items" onClick={showSidebar}>
                        <li className="sidebar-toggle">
                            <Link to="#" className="menu-bars">
                                <VscIcons.VscThreeBars />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>            
        </div>
    )
}
