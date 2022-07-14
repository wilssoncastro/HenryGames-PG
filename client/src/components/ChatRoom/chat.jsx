import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , Link} from "react-router-dom";

import { getChats, getChatsFriend, getAllUsers, sendMessageChat } from "../../redux/actions";
import './Chat.css'
import NavBar from "../NavBar/navbar";


export default function Chat() {

    const dispatch = useDispatch()
    const ids = useParams()
    const [time, setTime] = useState(false)


    const [chat, setChat] = useState({
        message: "",
        username: ""
    })
    const my_chat = useSelector((state) => state.my_chat)
    const friend_chat = useSelector((state) => state.chat_friend)
    const allUsers = useSelector((state) => state.users)



    let myUser = allUsers.find(e => e.id === ids.id_user)
    let friendUser = allUsers.find(e => e.id === ids.idF)




    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getChats(ids.id_user, ids.idF))
        dispatch(getChatsFriend(ids.idF, ids.id_user))
        if (myUser != undefined) {
            let mensaje = document.getElementById("chats")
            mensaje.scrollTop = mensaje.scrollHeight
        }

    }, [dispatch, ids])

    let allChats = []

    if (my_chat.length) {
        for (let i = 0; i < my_chat.length; i++) {
            allChats.push(my_chat[i])

        }
    }

    if (friend_chat.length) {
        for (let i = 0; i < friend_chat.length; i++) {
            allChats.push(friend_chat[i])

        }
    }

    

    let chatsSorted = allChats.sort(function (a, b) {

        if (a.createdAt > b.createdAt) {
            return 1
        }
        if (b.createdAt > a.createdAt) {
            return -1
        }

        return 0;

    })

    


    if (chatsSorted != undefined && document.getElementById("chats")) {
        
        let mensaje = document.getElementById("chats")
        setTimeout(() => {
            mensaje.scrollTop = mensaje.scrollHeight
        }, 1000);

    }



    const handleSumbit = (e) => {
        e.preventDefault()
        if (chat.message != "") {
            
            dispatch(sendMessageChat(ids.id_user, ids.idF, chat))
            dispatch(getChatsFriend(ids.idF, ids.id_user))
            dispatch(getChats(ids.id_user, ids.idF))  
            
            
            setChat({
                ...chat,
                message: ""
            })
            
                // dispatch(getChatsFriend(ids.idF, ids.id_user))
                // dispatch(getChats(ids.id_user, ids.idF))
            
           
            if (myUser != undefined) {
                setTimeout(() => {
                    let mensaje = document.getElementById("chats")
                    mensaje.scrollTop = mensaje.scrollHeight
                   
                    
                }, 2000);

            }
        }


    }

    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getChatsFriend(ids.idF, ids.id_user))
        dispatch(getChats(ids.id_user, ids.idF))
    }


    const updateMessage = (e) => {
        setChat({
            ...chat,
            message: e.target.value,
            username: myUser.user
        })
        dispatch(getChatsFriend(ids.idF, ids.id_user))
        if (myUser != undefined) {
            setTimeout(() => {
                let mensaje = document.getElementById("chats")
                mensaje.scrollTop = mensaje.scrollHeight
            }, 1000);

        }

    }

    // setInterval(() => {
    //     dispatch(getChatsFriend(ids.idF, ids.id_user))
    // }, 10000);




    return (
        <div className="Container_component_chats">
            <NavBar />

            {friendUser != undefined ?
                <div className="tittle_chats">
                    <Link to={`/friends/${ids.id_user}`}>
                    <button className="btn_back_profile">
                    Back
            </button>
            </Link>
                    <h3>You are chatting with {friendUser.user}</h3>

                </div> : <div> <button className="btn_back_profile">
                Back    
            </button><h1 className="tittle_chats"> You have no messages here</h1>
            </div>}



            <div className="chats_container" id="chats">

                {chatsSorted.length > 0 && myUser && chatsSorted.map(e =>
                    <div >
                        {
                            <div className="chats" >
                                {e.id_user === myUser.id ?
                                    <div className="chatUser">

                                        <p className="message_user"> {e.message}</p>
                                        <p className="time_user">{e.updatedAt.slice(11, 16)}</p>
                                    </div>
                                    :
                                    <div className="chatFriend">
                                        <p className="message_friend">{e.username}:  {e.message}</p>
                                        <p className="time_user">{e.updatedAt.slice(11, 16)}</p>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                )}

            </div>



            {/* <div className="chats" id="chats">
                <div >
                    {myUser != undefined ?
                        <div className="chat_left  " >
                            <h5>{myUser.user}</h5>
                            {my_chat.map(e =>
                                <div className="chat_user">
                                    <p className="message_user">{e.message}</p>
                                    <p className="time_user">{e.updatedAt.slice(11, 16)}</p>
                                </div>
                            )}
                        </div>
                        : ""
                    }</div>

                {friendUser != undefined ?
                    <div className="chat_right" >
                        <h5>{friendUser.user}</h5>

                        {friend_chat.map(e =>

                            <div className="chat_friend" >
                                <p className="message_user">{e.message}</p>
                                <p className="time_user">{e.updatedAt.slice(11, 16)}</p>
                            </div>
                        )}

                    </div> : ""}
            </div> */}
            <form onSubmit={(e) => handleSumbit(e)}>
                <input type="text"
                    className="input_chat"
                    placeholder="Type a message"
                    value={chat.message}
                    onChange={(e) => updateMessage(e)}></input>
                <button
                    onClick={e => handleRefresh(e)}
                    className="btn_refresh"
                >Refresh</button>
                <button type="submit"
                    className="btn_send_message">
                    Send
                </button>

            </form>
        </div>

    )
}

