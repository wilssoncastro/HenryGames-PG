import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../redux/actions";
import "./LogOut.css"


export default function LogOut(){
    const dispatch = useDispatch();
    let navigate = useNavigate();

    function onClick(e){
        e.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/authentication/logout',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data)
            if(res){
                console.log('removiendo store')
                localStorage.removeItem('profile_pic')
                localStorage.removeItem('lastname')
                localStorage.removeItem('name')
                localStorage.removeItem('type')
                localStorage.removeItem('id')
                dispatch(getUserById())
                
            }
            
        })
        .catch(err => console.log(err))

        navigate('/')
    }

    return (
        <div>
            <button
           className="btn_log_out"
                onClick={(e) => onClick(e)}
                // style={{
                //   backgroundColor: "#f5978c",
                //   padding: ".8rem 2rem",
                //   cursor: "pointer",
                //   fontWeight: "700",
                // }}
            >
                Logout
            </button>
        </div>
    )
}