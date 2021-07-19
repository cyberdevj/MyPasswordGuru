import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginAccountItem from "./LoginAccountItem";
import AuthenticationService from "./AuthenticationService";

const LoginAccountList = () => {
    const [logins, setLogin] = useState([]);

    const history = useHistory();

    const loginAccountList = () => {
        let loginAccountList = [];
        if (logins.length === 0) {
            loginAccountList.push(
                <div key="0" className="ui yellow message">
                    No login account
                </div>
            );
        }
        for (let i in logins) {
            loginAccountList.push(<LoginAccountItem key={logins[i]["id"]} favicon={AuthenticationService.getFaviconUrl(logins[i]["url"])} name={logins[i]["name"]} username={logins[i]["username"]} url={`/login/view/${logins[i]["id"]}`} />);
        }
        return loginAccountList;
    };

    useEffect(() => {        
        let result = AuthenticationService.get("logins");
        if (result["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        if (result["data"])
            setLogin(result["data"]);
    }, [history]);

    return (
        <div className="ui">
            <h3>Your Logins</h3>
            <Link className="ui button" to="/login/new">Add</Link>
            <div className="ui celled list">
                {loginAccountList()}
            </div>
        </div>
    );
}

export default LoginAccountList;