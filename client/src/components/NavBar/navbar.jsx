import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FriendList } from "./FriendList";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import './navbar.css';
import './friendlist.css'
import { useSelector } from "react-redux";

export default function NavBar() {
    const [sidebar, setSidebar] = useState(false);
    const [friendBox, setFriendBox] = useState(false);
    const cartLocal = JSON.parse(localStorage.getItem('cart'))


    const showSidebar = () =>{ 
        if(sidebar === true){
            setFriendBox(false)
            setSidebar(!sidebar)
        }
        setSidebar(!sidebar)
    };

    const showFriendBox = () => setFriendBox(!friendBox);


    // Data for sidebar, can't separate in modules because of onClick hook context import/export
    const SidebarData = [
        {
            title: 'Profile',
            path: '/profile',
            icon: <CgIcons.CgProfile/>,
            className: 'nav-text',
            onClick: showSidebar
        },
        {
            title: 'Theme',
            path: '#',
            icon: <VscIcons.VscColorMode/>,
            className: 'nav-text',
            onClick: showSidebar
        },
        {
            title: 'Language',
            path: '#',
            icon: <BsIcons.BsTranslate/>,
            className: 'nav-text',
            onClick: showSidebar
        },
        {
            title: 'Friends',
            path: '#',
            icon: <FaIcons.FaUserFriends/>,
            className: 'friends-text',
            onClick: showFriendBox
        }
        ]
      

    return (
        <div>
            {console.log(cartLocal)}
            <IconContext.Provider value={{color: '#fff'}}>

                {/* Burger Menu */}
                <div className="navbar">

                    <div className="NavBar-left">
                        {/* Logo Henry Games clickeable para home */}
                        <Link to='/home'>
                            <img className='henrygames-logo' src='https://cdn.discordapp.com/attachments/960956320884883486/989525400512249947/genri_Logo.png' alt='nada' />
                        </Link>

                        {/* Store Section */}
                        <Link to='/store' className="left-sections">
                            <AiIcons.AiOutlineAppstoreAdd className="navbar-left-icons"/>
                            <h3 className="navleft-text">STORE</h3>
                        </Link>

                        {/* Library section */}
                        <Link to='/library' className="left-sections">
                            <BiIcons.BiLibrary className="navbar-left-icons" />
                            <h3 className="navleft-text">LIBRARY </h3>
                        </Link>
                    </div>
                

                    <div className="NavBar-center"></div>

                    <div className="NavBar-right">
                        {/* Chat clickable */}
                        <Link to="#">
                            <BiIcons.BiChat className="navbar-icons" />
                        </Link> 

                        {/* ShoppingCart clickable */}
                            
                            {
                            cartLocal? 
                            
                            (<Link to="/my_cart">
                            <MdIcons.MdShoppingCart className="navbar-icons" />
                            </Link>) :
                            (<Link to="/my_cart">
                            <MdIcons.MdOutlineShoppingCart className="navbar-icons" />
                            </Link> )
                        }
 */}
                        {/* SideMenu Opener (three lines) */}
                        <Link to='#' >
                            <VscIcons.VscThreeBars className="navbar-icons" onClick={showSidebar}/>
                        </Link>
                    </div>
                    
                </div>
                

                {/* Menu vertical TOGGLE de derecha a izquierda con su logica  */}
                {/* |||||||||||||||||||||||||||||||||||||   <----------------- */}
                {/* |||||||||||||||||||||||||||||||||||||   <----------------- */}
                {/* |||||||||||||||||||||||||||||||||||||   <----------------- */}
                {/* |||||||||||||||||||||||||||||||||||||   <----------------- */}
                <nav className={sidebar ? 'side-menu active' : 'side-menu'}>

                    {/* Tres barritas que las esconde el navbar, las dejamos porque si no se esconde Profile */}
                    <ul className="side-menu-items">
                        <li className="sidebar-toggle" onClick={showSidebar}>
                            <Link to="#" className="navbar-icons">
                                <VscIcons.VscThreeBars />
                            </Link>
                        </li>

                        {/* Map de los items que muestra el menu: Profile, Theme, Language, Log In, Friends */}
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.className} >
                                    <Link to={item.path} onClick={item.onClick}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}

                        {/* Renderiza componente de lista de amigos */}
                        <nav className={friendBox ? 'friendBox active' : 'friendBox'}>
                            <h3 className="friendBoxTitle">Friend List</h3>
                            <div className="FriendListBox">
                                {FriendList.map((user, index) => {
                                    return (
                                        <ul>
                                            <li key={index} className={user.className}>
                                                <Link to={user.path}>
                                                    {user.image}
                                                    <div className="userData">
                                                        <span className="userName">{user.name}</span>
                                                        <span className={user.status === 'Online' ? "userStatusOnline" : "userStatusOffline"}>{user.status}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </nav>
                        
                    </ul>
                </nav>
            </IconContext.Provider>            
        </div>
    )
}


