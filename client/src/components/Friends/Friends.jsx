import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriends, getUserById, getAllUsers, addFriend, deleteFriend } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import "./Friends.css"
import swal from "sweetalert";
import NavBar from "../NavBar/navbar";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";



export default function Friends() {

    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends)
    const user = useSelector((state) => state.my_user)
    const { id } = useParams()
    const allUsers = useSelector((state) => state.users)
    const [friend, setFriend] = useState("")
    const [show, setShow] = useState({
        yourfriends: true,
        addfriends: false,
    })
    const [copy, setCopy] = useState({
        copied: false,
    })
    let users = allUsers.filter(e => e.id !== id)
    let usersfiltered = users.filter(e => e.id.includes(friend) || e.user.toLowerCase().includes(friend.toLowerCase()))
   

    useEffect(() => {
        dispatch(getFriends(id))
        dispatch(getUserById(id))
        dispatch(getAllUsers())
    }, [dispatch, id])

    const handleInputChange = (e) => {
       
        e.preventDefault();
        setFriend(e.target.value);
        
    }
    const handleClick = (idFriend) => {
        if (friends.find(e => e.id === idFriend)) {
            swal({
                title: "Error",
                text: "You are already friends with this user",
                icon: "error",
            })
        } else
            dispatch(addFriend(id, idFriend)).then(
                swal({
                    text: "Added friend",
                    icon: "success",
                })
            )

    }
    const handleDelete = (idFriend) => {
        dispatch(deleteFriend(id, idFriend))
    }

    const handleshowfriends = () => {
        setShow({
            ...show,
            yourfriends: true,
            addfriends: false,
        });
    }
    const handleshowaddfriends = () => {
        setShow({
            ...show,
            yourfriends: false,
            addfriends: true,
        });
    }

    const handlecopy = () => {
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById("code").innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        setCopy({
            ...copy,
            copied: true,

        });
    }

    

    return (
        <div className="component_friends">

            <NavBar />

            <div className="container_all">
                <div className="user_prof">
                    <img className="img_profile_friends" src={user.profile_pic} alt='' />
                    <h2>{user.user}</h2>
                </div>
                <div className="btns_container">
                    <button onClick={e => { handleshowfriends(e) }} className="label_list_friend"> <FaIcons.FaUserFriends />  Your Friends</button>
                    <button onClick={e => { handleshowaddfriends(e) }} className="label_list_friend_add"> <AiIcons.AiOutlineUsergroupAdd /> Add Friends</button>
                </div>

                {show.yourfriends && friends.length ? <div className="count_list_friends"> <p>Your friends {friends.length}/365</p>   </div> : ""}


                <div className="list_friend_comp">
                    {show.yourfriends ?

                        friends.length ?
                            friends.map(e => {
                                return (
                                    <div className="friend_box">
                                        <img className="friend_img" src={e.profile_pic} alt='' />
                                        <div className="text_frient_container">
                                            <p> user: {e.user} </p>
                                            <p> {e.email}</p>
                                        </div>
                                        <Link to = {`/chat/${id}/${e.id}`}>
                                        <button  className="btn_to_message">Send Message</button>
                                        </Link>
                                        <button className="btn_add_delete_friend" onClick={() => handleDelete(e.id)}>Delete friend</button>

                                    </div>
                                )

                                
                            }) :<div className="friend_box"> <h3>You don't have any friend</h3> </div>
                        : ""
                    }
                </div>




                {show.addfriends ?
                    <div className="add_friend_container">
                        <div className="options_add_container">
                            <h3 className="tittle_add_friend">Add a new friend</h3>
                            <label>Your code of friend:</label>
                            <p className="code_user_friend" id="code">{user.id}</p>
                            {copy.copied == false ? <button className="buttonCopy" onClick={(e) => handlecopy()}>COPY</button> : <button onClick={(e) => handlecopy()} className="buttonCopied">COPIED!</button>}
                            <p >Enter the friend code or username to send an invitation.</p>
                            <input
                                className="field"
                                value={friend}
                                placeholder="enter a code or a user"
                                type="text"
                                onChange={(e) => handleInputChange(e)}
                            />

                            {
                                friend != "" ? usersfiltered.length ?
                                    usersfiltered.map(e => {
                                        return (
                                            <div className="friend_box">
                                                <img className="friend_img" src={e.profile_pic} alt="" />
                                                <div className="text_frient_container">
                                                    <p>{e.name} {e.lastname}</p>
                                                    <p>user: {e.user}</p>
                                                </div>
                                                <button className="btn_add_friend" onClick={() => handleClick(e.id)}>Add friend</button>
                                            </div>
                                        )
                                    }) : <h5>User not fount</h5> : ""
                            }
                        </div>
                    </div>
                    : ""}


            </div>
        </div >



    )
}

