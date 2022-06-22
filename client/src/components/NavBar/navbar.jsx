import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
import { FriendList } from "./FriendList";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"
import './navbar.css';
import './friendlist.css'

export default function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const [friendBox, setFriendBox] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showFriendBox = () => setFriendBox(!friendBox);


  const SidebarData = [
    {
      title: 'Profile',
      path: '#',
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
          <IconContext.Provider value={{color: '#fff'}}>

              {/* Burger Menu */}
              <div className="navbar"> 

                {/* Chat clickable */}
                <Link to="#">
                  <BiIcons.BiChat className="navbar-icons" />
                </Link> 

                {/* ShoppingCart clickable */}
                <Link to="/my_cart">
                  <MdIcons.MdOutlineShoppingCart className="navbar-icons" />
                </Link> 

                {/* SideMenu Opener (three lines) */}
                <Link to='#' >
                    <VscIcons.VscThreeBars className="navbar-icons" onClick={showSidebar}/>
                </Link>
              </div>

              {/* Menu vertical invisible de izquierda a derecha con su logica */}
              <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                  <ul className="side-menu-items">
                      <li className="sidebar-toggle" onClick={showSidebar}>
                          <Link to="#" className="navbar-icons">
                              <VscIcons.VscThreeBars />
                          </Link>
                      </li>
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
                      <nav className={friendBox ? 'friendBox active' : 'friendBox'}>
                        <h3 className="friendBoxTitle">Friend List</h3>
                        <div className="FriendListBox">
                            {FriendList.map((user, index) => {
                                return (
                                    <ul>
                                        <li key={index} className={user.className}>
                                            <Link to={user.path}>
                                                {user.image}
                                                <span className="userName">{user.name}</span>
                                                <span className="userStatus">{user.status}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                      </nav>

                  </ul>
              </nav>

              {/* Friend List
              <nav className={friendBox ? 'friendBox active' : 'friendBox'}>
                  <ul className="side-menu-items" onClick={showSidebar}>
                      <li className="sidebar-toggle">
                          <Link to="#" className="navbar-icons">
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
              </nav>      */}
          </IconContext.Provider>            
      </div>
  )
}


// export default function Header() {
//   return (
//     <div>
//       <Link to='/home'>
//         <img src='' alt='' />
//       </Link>
//       <Link to='/log_in'>
//         <button>Log In</button>
//       </Link>
//       <Link to='/sign_up'>
//         <button>Sign Up</button>
//       </Link>
//       <Link to='/profile'>
//         <img src='' alt='' />
//       </Link>
//     </div>
//   )
// }
