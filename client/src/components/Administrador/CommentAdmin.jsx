import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, delete_comment, get_all_comments, unreport_comment } from "../../redux/actions";
import NavBar from "../NavBar/navbar";
import './CommentAdmin.css'

export default function CommentAdmin(){
    const dispatch = useDispatch()
    const all_comments = useSelector(state => state.all_comments.filter(e => e.reported))
    
    useEffect(() => {
        dispatch(get_all_comments())
    },[dispatch, get_all_comments])
    

    //let reported_comments = all_comments.filter(e => e.reported)

    
    return (
        <div className="div-reported-comments">
            <NavBar />
            <div className="tittle_component_comments">
            REPORTED COMMENTS
            </div>
            <ul className="list-reported-comments">
                {all_comments.length? 
                
                all_comments.map(e => 
                e.reported ? 
                <li className="reported-comment">
                    <div className="info-reported-comment">
                        <p>User: {e.username}</p>
                        <p>{e.comment}</p>
                    </div>
                    <div className="buttons-reported-comment">
                        <button onClick={() => {dispatch(delete_comment(e.id))}}>Delete comment</button>
                        <button onClick={() => {dispatch(banUser(e.id_user))}}>Ban User</button>
                        <button onClick={() => {dispatch(unreport_comment(e.id))}}>Do anything</button>
                    </div>
                    <br></br>
                </li>
                :<></>
                    )
                : <li>No reported comments</li>
            }
            </ul>
        </div>
    )
}