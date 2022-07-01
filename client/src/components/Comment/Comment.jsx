import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Comment.css"

export default function Comment({id_game}){

    let [comment, setComment] = useState('')
    let [error, setError] = useState('');
    let id_user = localStorage.getItem('id')
    console.log(id_user)

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
            console.log('Enviado')
            const data = await axios.post(
                `http://localhost:3001/comments/madeComment/${id_user}/${id_game}`, 
                {comment:comment})
            .then(res => console.log('BIEEEEEEEn'))
            .catch(err => console.log(err))
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
                    <label>Comentario</label>
                    <textarea name='comment' value={comment} onChange={handleChange}></textarea>
                </div>
                <div>
                    <button type="submit">Comentar!</button>
                </div>
            </form>
        </div>
    )
}