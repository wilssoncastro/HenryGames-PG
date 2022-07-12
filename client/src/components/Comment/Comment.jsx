import React, { /* useEffect */ useState } from "react";
import { useDispatch, /* useSelector */ } from "react-redux";
import { post_comment } from "../../redux/actions";
//import axios from "axios";
import "./Comment.css"

export default function Comment({id_game}){

    let [comment, setComment] = useState('')
    let [error, setError] = useState('');
    let id_user = localStorage.getItem('id')
    const dispatch = useDispatch()
    

    function validate(comment){
        error = ''

        if(comment.length > 256){
            error = 'El comentario es muy largo'
        }

        return error
    }

    async function onSubmit(e){
        e.preventDefault()
        
        
        if(error.length === 0 && comment.length !== 0){
            let username = localStorage.getItem('user')
            dispatch(post_comment(id_user,id_game,{comment:comment, username: username}))

            setComment('')
            setError('')
        }else{
            setError('Error')
        }
    }


    function handleChange(e){
        setComment(e.target.value)

        setError(validate(e.target.value))
    }
    

    return (
        <div className="commentary-box">
            <form onSubmit={onSubmit}>
                <div>
                    <label>Review</label>
                    <textarea className="new_comment" name='comment' value={comment} onChange={handleChange}></textarea>
                </div>
                <div>
                    <button type="submit">Comment!</button>
                </div>
            </form>
        </div>
    )
}