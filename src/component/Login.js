import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    render() {
        return (
            <div className="ui center-screen">
                <h1 className="ui header">
                    <div className="content">Password Guru</div>
                </h1>
                <div className="ui form">
                    <div className="field w-250">
                        <label>PIN</label>
                        <input type="text" name="pin" placeholder="pin" />
                    </div>
                    <Link className="ui primary submit button w-250" to="/login/list">Login</Link>
                </div>
            </div>
        );
    };
};

export default Login