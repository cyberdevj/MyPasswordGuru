import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import UISegment from "./UISegment";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import AuthenticationService from "./AuthenticationService";

const LoginAccountEdit = () => {
    const [title, setTitle] = useState("Add New Login");
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [otp, setOtp] = useState(null);
    const [url, setUrl] = useState(null);
    const [prevlink, setPrevlink] = useState("/login/list");

    const history = useHistory();
    const location = useLocation().pathname;
    const params = useParams();

    const isEdit = useCallback(() => {
        return (location.includes("login") && location.includes("edit"));
    }, [location]);

    const addLogin = () => {
        let result = AuthenticationService.get("logins");
        if (result["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = result["data"];
        if (!data)
            data = [];
        
        let id = AuthenticationService.getLastId(data);
        id++;
        data.push({
            id: id,
            name: name,
            username: username,
            password: password,
            otp: otp,
            url: url
        });

        AuthenticationService.set("logins", data);
        history.push(prevlink);
    };

    const editLogin = () => {
        let logins = AuthenticationService.get("logins");
        if (logins["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = AuthenticationService.updateItemFromList(params["id"], logins["data"], {
            id: parseInt(params["id"]),
            name: name,
            username: username,
            password: password,
            otp: otp,
            url: url
        });

        let saveResult = AuthenticationService.set("logins", data);
        if (saveResult["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        history.push(`${prevlink}/${params["id"]}`);
    };

    const processLogin = (e) => {
        e.preventDefault();
        if (isEdit())
            editLogin();
        else
            addLogin();
    };

    useEffect(() => {
        if (!isEdit())
            return;
        
        let logins = AuthenticationService.get("logins");
        if (logins["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = AuthenticationService.getItemFromList(params["id"], logins["data"]);
        setTitle("Edit Login");
        setName(data["name"]);
        setUsername(data["username"]);
        setPassword(data["password"]);
        setOtp(data["otp"]);
        setUrl(data["url"]);
        setPrevlink("/login/view");
    }, [history, params, isEdit]);

    return (
        <form className="ui form">
        <h1 className="ui header">
            <div className="ui content">{title}</div>
        </h1>
        
        <UISegment>
            <UITextField label="Name" type="text" name="name" defaultValue={name} onChange={e => setName(e.target.value)} />
        </UISegment>

        <UISegmentWithHeader header="Credentials">
            <UITextField label="Username" type="text" name="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
            <UITextField label="Password" type="password" name="password" iconCss="copy outline icon" defaultValue={password} onChange={e => setPassword(e.target.value)} />
        </UISegmentWithHeader>

        <UISegmentWithHeader header="One Time Password">
            <UITextField type="text" name="oneTimePassword" defaultValue={otp} />
        </UISegmentWithHeader>
        
        <UISegmentWithHeader header="URL">
            <UITextField type="text" name="uri" iconCss="external alternate icon" defaultValue={url} onChange={e => setUrl(e.target.value)} />
        </UISegmentWithHeader>

        <div className="ui right floated">
            <button className="ui icon button positive" onClick={processLogin}><i className="save outline icon"></i></button>
            <Link className="ui icon button" to={prevlink}><i className="window close outline icon"></i></Link>
        </div>
    </form>
    );
};

export default LoginAccountEdit;