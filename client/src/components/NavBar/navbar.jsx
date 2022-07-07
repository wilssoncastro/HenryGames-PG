import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FriendList } from "./FriendList";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"
import * as AiIcons from "react-icons/ai"
import * as FiIcons from "react-icons/fi"
import * as RiIcons from "react-icons/ri"
import './navbar.css';
import './friendlist.css'
import { useDispatch, useSelector } from "react-redux";
import { getUserById, is_authorizated } from "../../redux/actions";

export default function NavBar() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const [friendBox, setFriendBox] = useState(false);
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    let id = localStorage.getItem("id");
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.my_user)
    
    //const is_online = useSelector((state) => state.is_online)
    const current_cart = (typeof id === 'object') ? cartLocal : cart
    

    function logOut(e){
        e.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/authentication/logout',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        })
        .then((res) => {
            if(res){
                console.log('removiendo store')
                localStorage.removeItem('profile_pic')
                localStorage.removeItem('lastname')
                localStorage.removeItem('name')
                localStorage.removeItem('type')
                localStorage.removeItem('id')
                dispatch(getUserById())
                
            }
            
        })
        .catch(err => console.log(err))

        navigate('/')
    }

    
    useEffect(() => {
        if (id) {
          dispatch(getUserById(id))          
        }

        
      }, [dispatch, id])

    const showSidebar = () => {
        if (sidebar === true) {
            setFriendBox(false)
            setSidebar(!sidebar)
        }
        setSidebar(!sidebar)
    };

    const showFriendBox = () => setFriendBox(!friendBox);


    // Data for sidebar, can't separate in modules because of onClick hook context import/export
    let sidebarData = [
        {
            title: 'Profile',
            path: `/profile/${id}`,
            icon: <CgIcons.CgProfile />,
            className: 'nav-text',
            onClick: showSidebar,
            loggedIn: true
        },
        {
            title: 'Theme',
            path: '#',
            icon: <VscIcons.VscColorMode />,
            className: 'nav-text',
            onClick: showSidebar,
        },
        {
            title: 'Language',
            path: '#',
            icon: <BsIcons.BsTranslate />,
            className: 'nav-text',
            onClick: showSidebar
        },
        {
            title: 'Admin Tools',
            path: '/admin',
            icon: <RiIcons.RiAdminLine />,
            className: 'nav-text',
            onClick: showSidebar,
            loggedIn: true
        },
        {
            title: 'Friends',
            path: '#',
            icon: <FaIcons.FaUserFriends />,
            className: 'bottom-text-first',
            onClick: showFriendBox,
            loggedIn: true
        },
        {
            title: 'Log Out',
            path: '#',
            icon: <FiIcons.FiLogOut style={{color: '#0a7c3b'}} />,
            className: 'log-out-button',
            onClick: logOut,
            loggedIn: true
        },
        {
            title: 'Log In',
            path: '/log_in',
            icon: <FiIcons.FiLogIn />,
            className: 'log-in-button',
            onClick: showSidebar,
            loggedIn: false
        },
        {
            title: 'Sign Up',
            path: '/sign_up',
            icon: <CgIcons.CgProfile style={{color: '#1a83ff'}}/>,
            className: 'sign-up-button',
            onClick: showSidebar,
            loggedIn: false
        }
    ]

    let sidebarDataInfo = []
    if (!user) {
        sidebarData.map((e) => {
            if (e.loggedIn == false || !e.loggedIn) {
                sidebarDataInfo.push(e)
            }
        })
    } else {
        sidebarData.map((e) => {
            if (e.loggedIn === true || e.loggedIn == null) {
                sidebarDataInfo.push(e)
            }
        })
    }

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>

                {/* Burger Menu */}
                <div className="navbar">

                    <div className="NavBar-left">
                        {/* Logo Henry Games clickeable para home */}
                        <Link to='/home'>
                            <img className='henrygames-logo' src='https://cdn.discordapp.com/attachments/960956320884883486/989525400512249947/genri_Logo.png' alt='nada' />
                        </Link>

                        {/* Store Section */}
                        <Link to='/store' className="left-sections">
                            <AiIcons.AiOutlineAppstoreAdd className="navbar-left-icons" />
                            <h3 className="navleft-text">STORE</h3>
                        </Link>

                        {/* Library section */}
                        <Link to='/library' className="left-sections">
                            <BiIcons.BiLibrary className="navbar-left-icons" />
                            <h3 className="navleft-text">LIBRARY </h3>
                        </Link>

                    {/* {!user.id? 
                    <div>
                        <Link to="/log_in">
                            <button className="btn_log_in">LOG IN</button>
                        </Link>
                        <Link to="/sign_up">
                            <button class="btn_sign_up">SIGN UP</button>
                        </Link>
                    </div>
                    : 
                    <LogOut />
                    } */}
                     </div>



                    <div className="NavBar-center"></div>

                    <div className="NavBar-right">
                        {/* Chat clickable */}
                        <Link to="#">
                            <BiIcons.BiChat className="navbar-icons" />
                        </Link>

                        {/* ShoppingCart clickable */}

                        {
                            current_cart ?

                                (<Link to="/my_cart">
                                    {current_cart && current_cart.length ? <span className="numC">{current_cart.length}</span> : <></>}
                                    <MdIcons.MdShoppingCart className="navbar-icons" />
                                </Link>) :
                                (<Link to="/my_cart">
                                    <MdIcons.MdOutlineShoppingCart className="navbar-icons" />
                                </Link>)
                        }
                        {/* SideMenu Opener (three lines) */}
                        <Link to='#' >
                            <VscIcons.VscThreeBars className="navbar-icons" onClick={showSidebar} />
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

                        {/* Map de los items que muestra el menu: Profile, Theme, Language, Log In, Friends */}
                        <div id="navbar-side-items">
                            {sidebarDataInfo.map((item, index) => {
                                return (
                                    
                                        <li key={index} className={item.className}>
                                            <Link to={item.path} onClick={item.onClick}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    
                                )
                            })}
                        </div>

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


