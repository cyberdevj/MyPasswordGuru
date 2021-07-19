import React, { useEffect, useState } from "react";
import AuthenticationService from "./AuthenticationService";
import { Link, useHistory } from "react-router-dom";

const Main = () => {
    const [username, setUsername] = useState(null);
    const [pin, setPin] = useState(null);
    const [error, setError] = useState(false);

    const history = useHistory();

    const login = (e) => {
        e.preventDefault();
        setError(false);
        let result = AuthenticationService.sessionStart(pin);
        if (result)
            history.push("/login/list")
        else
            setError(true);
    };

    useEffect(() => {
        if (AuthenticationService.sessionValid()) {
            history.push("/login/list");
            return;
        }

        let result = AuthenticationService.getUser();
        if (result)
            setUsername(result["data"]);
    }, [history]);

    return (
        <div className="ui center-screen">
            <h1 className="ui header">
                <div className="content">Password Guru</div>
            </h1>
            <div className="ui green message" hidden={!username}>Logged in as {username}</div>
            <div className="ui red message" hidden={!error}>Invalid PIN</div>
            <div className="ui form">
                <div className="field w-250">
                    <label>PIN</label>
                    <input type="password" name="pin" placeholder="pin" defaultValue={pin} onChange={e => setPin(e.target.value)} />
                </div>
                <div className="ui grid">
                    <div className="eight wide column">
                        <button className="ui fluid blue button" disabled={!username} onClick={login}>Login</button>
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