import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const Nav = (props) => {
    const [account, setAccount] = useState("item");
    const [generate, setGenerate] = useState("item");
    const [settings, setSettings] = useState("item");
    
    const history = useHistory();
    const location = useLocation().pathname;

    const lockAccount = (e) => {
        e.preventDefault();
        AuthenticationService.sessionDestroy();
        history.push("/");
    };

    useEffect(() => {
        if (!AuthenticationService.sessionValid())
            history.push("/");

        setAccount(location.includes("login") ? "item active" : "item");
        setGenerate(location.includes("generate") ? "item active" : "item");
        setSettings(location.includes("account") ? "item active" : "item");
    }, [history, location]);
    
    return (
        <div className="ui container">
            <div className="ui four item menu">
                <Link className={account} to="/login/list" onClick={e => setAccount("item active")}>Your Logins</Link>
                <Link className={generate} to="/generate/basic">Generate</Link>
                <Link className={settings} to="/account">Account</Link>
                <button className="ui link button item" onClick={lockAccount}>Lock</button>
            </div>
            {props.children}
        </div>
    );
};

export default Nav;