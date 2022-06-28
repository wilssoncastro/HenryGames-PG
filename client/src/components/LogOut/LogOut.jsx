import axios from "axios";
import React from "react";

export default function LogOut(){

    function onClick(e){
        e.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/authentication/logout',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        })
        .then((res) => console.log(res))
        .catch(err => console.log(err))

    }

    return (
        <div>
            <button
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