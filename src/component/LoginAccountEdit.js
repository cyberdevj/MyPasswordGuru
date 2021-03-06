import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import UISegment from "./UISegment";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import AuthenticationService from "./AuthenticationService";
import GeneratorService from "./GeneratorService";

const LoginAccountEdit = () => {
    const [title, setTitle] = useState("Add New Login");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [url, setUrl] = useState("");
    const [prevlink, setPrevlink] = useState("/login/list");

    const [usernameCopied, setUsernameCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const copyToClipboard = (e, key, value) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        if (key === "username" && usernameCopied) return;
        if (key === "password" && passwordCopied) return;
        if (key === "username") setUsernameCopied(true);
        if (key === "password") setPasswordCopied(true);
        setTimeout(() => {
            setUsernameCopied(false);
            setPasswordCopied(false);
        }, 1000);
    };
    
    const goToGenerator = (e) => {
        e.preventDefault();
        GeneratorService.setUpdateState("R", {
            id: params["id"] ? params["id"] : null,
            name: name,
            username: username,
            url: url,
            otp: otp
        });
        history.push(`/generate/password`);
    };

    const goToUrl = (e) => {
        e.preventDefault();
        window.open(AuthenticationService.getHttps(url), "_blank");
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
        setName(data["name"] ? data["name"] : "");
        setUsername(data["username"] ? data["username"] : "");
        setPassword(data["password"] ? data["password"] : "");
        setOtp(data["otp"] ? data["otp"] : "");
        setUrl(data["url"] ? data["url"] : "");
        setPrevlink("/login/view");
        setTitle("Edit Login");
    }, [history, params, isEdit]);

    useEffect(() => {
        let localUpdateState = GeneratorService.getUpdateState();
        if (localUpdateState["data"]) {
            setName(localUpdateState["data"]["name"] ? localUpdateState["data"]["name"] : "");
            setUsername(localUpdateState["data"]["username"] ? localUpdateState["data"]["username"] : "");
            setOtp(localUpdateState["data"]["otp"] ? localUpdateState["data"]["otp"] : "");
            setUrl(localUpdateState["data"]["url"] ? localUpdateState["data"]["url"] : "");
        }
        if (localUpdateState["state"] === "S") {
            let lastPassword = GeneratorService.getLastGeneratedPassword();
            setPassword(lastPassword.new.join(''));
            GeneratorService.setUpdateState(null, null);
        }
    }, []);

    return (
        <form className="ui form">
        <h1 className="ui header">
            <div className="ui content">{title}</div>
        </h1>
        
        <UISegment>
            <UITextField label="Name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </UISegment>

        <UISegmentWithHeader header="Credentials">
            <UITextField label="Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}>
                <button className="ui icon button" onClick={e => copyToClipboard(e, "username", username)}>
                    <i className={`copy link icon`}></i>
                    {usernameCopied ? <div className="floating ui label">Copied!</div> : null}
                </button>
            </UITextField>
            {!showPassword ?
                <UITextField label="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}>
                    <div className="ui icon button" onClick={e => setShowPassword(!showPassword)}>
                        <i className={`eye slash outline link icon`}></i>
                    </div>
                    <button className="ui icon button" onClick={e => goToGenerator(e)}>
                        <i className={`sync link icon`}></i>
                    </button>
                    <button className="ui icon button" onClick={e => copyToClipboard(e, "password", password)}>
                        <i className={`copy link icon`}></i>
                        {passwordCopied ? <div className="floating ui label">Copied!</div> : null}
                    </button>
                </UITextField> :
                <UITextField label="Password" type="text" name="password" value={password} onChange={e => setPassword(e.target.value)}>
                    <div className="ui icon button" onClick={e => setShowPassword(!showPassword)}>
                        <i className={`eye slash outline link icon`}></i>
                    </div>
                    <button className="ui icon button" onClick={e => goToGenerator(e)}>
                        <i className={`sync link icon`}></i>
                    </button>
                    <button className="ui icon button" onClick={e => copyToClipboard(e, "password", password)}>
                        <i className={`copy link icon`}></i>
                        {passwordCopied ? <div className="floating ui label">Copied!</div> : null}
                    </button>
                </UITextField>
            }
        </UISegmentWithHeader>

        <UISegmentWithHeader header="One Time Password (TOTP)">
            <UITextField type="text" name="oneTimePassword" value={otp} onChange={e => setOtp(e.target.value)} />
        </UISegmentWithHeader>
        
        <UISegmentWithHeader header="URL">
            <UITextField type="text" name="url" value={url} onChange={e => setUrl(e.target.value)}>
                <button className="ui icon button" onClick={e => goToUrl(e)}>
                    <i className={`share square icon`}></i>
                </button>
            </UITextField>
        </UISegmentWithHeader>

        <div className="ui right floated">
            <button className="ui icon button positive" onClick={processLogin}><i className="save outline icon"></i></button>
            <Link className="ui icon button" to={`${prevlink}/${params["id"]}`}><i className="window close outline icon"></i></Link>
        </div>
    </form>
    );
};

export default LoginAccountEdit;