import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = (props) => {
    const location = useLocation().pathname;
    let accountsClass = (location.includes("passwords")) ? "item active" : "item";
    let generateClass = (location.includes("generate")) ? "item active" : "item";
    let settingsClass = (location.includes("account")) ? "item active" : "item";
    
    return (
        <div className="ui container">
            <div className="ui three item stackable tabs menu">
                <Link className={accountsClass} to="/passwords">Your Logins</Link>
                <Link className={generateClass} to="/generate/basic">Generate</Link>
                <Link className={settingsClass} to="/account">Account</Link>
            </div>
            {props.children}
        </div>
    );
};

export default Nav;