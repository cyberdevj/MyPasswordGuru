import React from "react";
import { Link } from "react-router-dom";

const LoginAccountItem = (props) => {
    return (
        <Link className="item" to={props.url}>
            <img className="ui avatar image" alt="" src={props.favicon} />
            <div className="content">
                <div className="header">{props.name}</div>
                <div className="meta">{props.username}</div>
            </div>
        </Link>
    );
};

export default LoginAccountItem;