import React from "react";
import { Link } from "react-router-dom";


export default function errorLogin() {

    return (
        <div>
            Please log in to continue
            <Link to="/log_in">
                <button className="btn_log_in">LOG IN</button>
            </Link>
            <Link to="/sign_up">
                <button class="btn_sign_up">SIGN UP</button>
            </Link>
        </div>

    )

}
