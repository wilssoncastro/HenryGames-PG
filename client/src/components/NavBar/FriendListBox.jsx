import React from 'react'
import { FriendList } from "./FriendList";
import { Link } from 'react-router-dom';


export default function FriendListBox() {
  return (
    <div>
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
    </div>
  )
}
