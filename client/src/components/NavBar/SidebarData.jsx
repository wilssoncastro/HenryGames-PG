import React from 'react'
import NavBar from './navbar';
import { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as VscIcons from "react-icons/vsc";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
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
