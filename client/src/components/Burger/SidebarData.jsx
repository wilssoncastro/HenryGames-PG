import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as VscIcons from "react-icons/vsc";
import * as BsIcons from "react-icons/bs";


export const SidebarData = [
    {
        title: 'Profile',
        path: '/profile/:id',
        icon: <CgIcons.CgProfile/>,
        className: 'nav-text'
    },
    {
        title: 'Friends',
        path: '/friends/:id',
        icon: <FaIcons.FaUserFriends/>,
        className: 'nav-text'
    },
    {
        title: 'Theme',
        path: '#',
        icon: <VscIcons.VscColorMode/>,
        className: 'nav-text'
    },
    {
        title: 'Language',
        path: '/',
        icon: <BsIcons.BsTranslate/>,
        className: 'nav-text'
    },
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        className: 'nav-text'
    }
]
    