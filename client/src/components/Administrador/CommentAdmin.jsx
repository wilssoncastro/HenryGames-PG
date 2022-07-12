import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, delete_comment, get_all_comments } from "../../redux/actions";

export default function CommentAdmin(){
    const dispatch = useDispatch()
    const all_comments = useSelector(state => state.all_comments)
    useEffect(() => {
        dispatch(get_all_comments())
    },[])  

    
    return (
        <div>
            <ul>
                {all_comments? 
                
                all_comments.map(e => <li>
                    User: {e.username}
                    <br></br>

                    {e.comment}
                    <button onClick={() => {dispatch(delete_comment(e.id))}}>Delete comment</button>
                    <button onClick={() => {dispatch(banUser(e.id_user))}}>Ban User</button>
                    <br></br>
                    </li>
                    )
                : <>No hay comentarios</>
            }
            </ul>
        </div>
    )
}