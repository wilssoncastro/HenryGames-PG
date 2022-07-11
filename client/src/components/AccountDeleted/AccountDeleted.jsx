import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteAccount } from "../../redux/actions/index";
import './AccountDeleted.css'

export default function AccountDeleted() {
    const id_user = localStorage.getItem('id')
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(deleteAccount(id_user))    
    }, [id_user]);


    return (
        <div className="da-body">
            <div className="deleted-message">
                <h2 >Your account has been succesfully deleted.</h2>
                <Link className='da-return-button' to='/'>Return</Link>
            </div>
        </div>
    )
}
