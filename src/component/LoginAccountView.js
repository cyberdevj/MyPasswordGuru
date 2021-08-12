import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import AuthenticationService from "./AuthenticationService";
import { totp } from "otplib";

const LoginAccountView = () => {
    const [login, setLogin] = useState({});
    const [usernameCopied, setUsernameCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);
    const [otpCopied, setOtpCopied] = useState(false);
    
    const [otpPercent, setOtpPercent] = useState(0);
    const [otpSecret, setOtpSecret] = useState("");
    const [otpPin, setOtpPin] = useState("");

    const history = useHistory();
    const params = useParams();


    const deleteLogin = (e) => {
        e.preventDefault();
        let logins = AuthenticationService.get("logins");
        logins = logins["data"].filter((obj) => {
            return obj.id !== parseInt(params["id"]);
        });

        AuthenticationService.set("logins", logins);
        history.push("/login/list");
    };

    const copyToClipboard = (e, key, value) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        if (key === "username" && usernameCopied) return;
        if (key === "password" && passwordCopied) return;
        if (key === "otp" && otpCopied) return;
        if (key === "username") setUsernameCopied(true);
        if (key === "password") setPasswordCopied(true);
        if (key === "otp") setOtpCopied(true);
        setTimeout(() => {
            setUsernameCopied(false);
            setPasswordCopied(false);
            setOtpCopied(false);
        }, 1000);
    };

    const goToUrl = (e) => {
        e.preventDefault();
        window.open(AuthenticationService.getHttps(login["url"]), "_blank");
    };

    useEffect(() => {
        let logins = AuthenticationService.get("logins");
        if (logins["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        
        let data = AuthenticationService.getItemFromList(params["id"], logins["data"]);
        setLogin(data);
        setOtpSecret(data["otp"]);
    }, [history, params]);
        
    useEffect(() => {
        if (!otpSecret) return;

        const otpId = setInterval(() => {
            setOtpPin(otpSecret ? totp.generate(otpSecret) : "");
            setOtpPercent(100 / (totp.timeRemaining() + totp.timeUsed()) * totp.timeUsed());
        }, 1000);

        return () => clearInterval(otpId);
    }, [otpSecret]);

    return (
        <form className="ui form">
            <h1 className="ui header">
                <div className="ui content">Account Information</div>
            </h1>
            
            <UISegmentWithProfilePicture src={AuthenticationService.getFaviconUrl(login["url"])}>
                <div className="header">{login["name"]}</div>
                <div className="description">
                    <button className="ui fluid button" onClick={e => goToUrl(e)}>Go to Login Page</button>
                </div>
            </UISegmentWithProfilePicture>

            <UISegmentWithHeader header="Credentials">
                <UITextField label="Username" type="text" name="username" value={login["username"] ? login["username"] : ""} isReadOnly={true}>
                    <button className="ui icon button" onClick={e => copyToClipboard(e, "username", login["username"])}>
                        <i className={`copy link icon`}></i>
                        {usernameCopied ? <div className="floating ui label">Copied!</div> : null}
                    </button>
                </UITextField>
                <UITextField label="Password" type="password" name="username" value={login["password"] ? login["password"] : ""} isReadOnly={true}>
                    <button className="ui icon button" onClick={e => copyToClipboard(e, "password", login["password"])}>
                        <i className={`copy link icon`}></i>
                        {passwordCopied ? <div className="floating ui label">Copied!</div> : null}
                    </button>
                </UITextField>
            </UISegmentWithHeader>

            <UISegmentWithHeader header="One Time Password">
                <UITextField type="text" name="oneTimePassword" value={otpPin ? otpPin : ""} isReadOnly={true} percent={otpPercent}>
                    <button className="ui icon button" onClick={e => copyToClipboard(e, "otp", otpPin)}>
                        <i className={`copy link icon`}></i>
                        {usernameCopied ? <div className="floating ui label">Copied!</div> : null}
                    </button>
                </UITextField>
            </UISegmentWithHeader>
            
            <UISegmentWithHeader header="URL">
                <UITextField type="text" name="url" value={login["url"] ? login["url"] : ""} isReadOnly={true}>
                    <button className="ui icon button" onClick={e => goToUrl(e)}>
                        <i className={`share square icon`}></i>
                    </button>
                </UITextField>
            </UISegmentWithHeader>

            <Link className="ui icon button positive" to={`/login/edit/${login["id"]}`}><i className="edit outline icon"></i></Link>
            <Link className="ui icon button" to="/login/list"><i className="window close outline icon"></i></Link>
            <div className="ui right floated">
                <button className="ui icon button red" onClick={deleteLogin}><i className="eraser icon"></i></button>
            </div>
        </form>
    );
};

export default LoginAccountView;