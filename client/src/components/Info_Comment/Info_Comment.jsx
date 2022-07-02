import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserById, delete_comment, edit_comment} from '../../redux/actions'
import './Info_Comment.css'
import axios from "axios";

export default function Info_Comment({id, id_user, comment, createdAt}){
    const dispatch = useDispatch()
    let [edit_mode, setEditMode] = useState(false)
    let [edittedComment, setEditedComment] = useState(comment)
    let [error, setError] = useState('');

    let idProfile = localStorage.getItem("id");
    let is_auhorized = typeof idProfile !== 'object' 

    useEffect(() => {

    },[dispatch])

    function validate(comment){
        error = ''

        if(comment.length > 256){
            error = 'El comentario es muy largo'
        }

        return error
    }

    function onSubmit(e){
        e.preventDefault()
        
        
        if(error.length === 0 && comment.length !== 0){
            console.log('Enviado')
            dispatch(edit_comment(id, {comment:edittedComment}))
            setEditMode(false)
            setError('')
        }else{
            setError('Error')
        }
    }

    function handleChange(e){
        setEditedComment(e.target.value)

        setError(validate(e.target.value))
    }


    let its_mine = (idProfile === id_user)

    function clickDelete(id){
        dispatch(delete_comment(id))
    }
    

    return (
        <div className="Info_Comment">
            <div className="info">
                <p>{its_mine ? 'Tu' : 'Anonimo'}</p>
                <p>{createdAt}</p>
            </div>
            <div className="body">
                {!edit_mode ?
                    <>
                    <div className="msg">
                        {edittedComment}
                    </div>
                    <div className="options">
                    {!is_auhorized ? <></> : (!its_mine &&
                            <>
                                <button>Denunciar</button>
                            </>)}
                        {
                            //REPORTAR COMENTARIO
                        }
                        {
                            its_mine && 
                            <>
                                <button onClick={() => setEditMode(true)}>Editar</button>
                                <button onClick={() => clickDelete(id)}>Borrar</button>
                            </>
                        }
                        
                    </div>
                    </>
                    :
                    <>
                        <form className="edit_form" onSubmit={onSubmit}>
                            <div className="textarea">
                                <textarea
                                    name='edittedComment' 
                                    value={edittedComment} 
                                    onChange={handleChange}
                                    placeholder={comment}>

                                </textarea>
                            </div>
                            <div className="options">
                                    <button type="submit">Aceptar</button>
                                    <button onClick={() => setEditMode(false)}>Cancelar</button>
                            </div>
                        </form>
                    </>
            }
            </div>
        </div>
    )
}