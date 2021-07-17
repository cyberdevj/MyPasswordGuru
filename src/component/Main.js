import React, { useEffect, useState } from "react";
import AuthenticationService from "./AuthenticationService";
import { Link } from "react-router-dom";

const Main = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(AuthenticationService.getUser());
    });

    return (
        <div className="ui center-screen">
            <h1 className="ui header">
                <div className="content">Password Guru</div>
            </h1>
            <div className="ui green message" hidden={!username}>Logged in as {username}</div>
            <div className="ui form">
                <div className="field w-250">
                    <label>PIN</label>
                    <input type="password" name="pin" placeholder="pin" />
                </div>
                <div className="ui grid">
                    <div className="eight wide column">
                        <button className="ui fluid blue button" to="/login/list" disabled={!username}>Login</button>
                    </div>
                    <div className="eight wide column">
                        <Link className="ui fluid green button" to="/account/new">New</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main