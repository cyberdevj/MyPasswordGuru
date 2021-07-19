import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import AuthenticationService from "./AuthenticationService";

const LoginAccountView = () => {
    const [login, setLogin] = useState({});

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

    useEffect(() => {
        let logins = AuthenticationService.get("logins");
        if (logins["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = AuthenticationService.getItemFromList(params["id"], logins["data"]);
        setLogin(data);
    }, [history, params]);

    return (
        <form className="ui form">
            <h1 className="ui header">
                <div className="ui content">Account Information</div>
            </h1>
            
            <UISegmentWithProfilePicture src={AuthenticationService.getFaviconUrl(login["url"])}>
                <div className="header">{login["name"]}</div>
                <div className="description">
                    <a className="ui fluid button" href={AuthenticationService.getHttps(login["url"])} target="_black">Go to Login Page</a>
                </div>
            </UISegmentWithProfilePicture>

            <UISegmentWithHeader header="Credentials">
                <UITextField label="Username" type="text" name="username" defaultValue={login["username"]} isReadOnly={true} />
                <UITextField label="Password" type="password" name="username" defaultValue={login["password"]} iconCss="copy outline icon" isReadOnly={true} />
            </UISegmentWithHeader>

            <UISegmentWithHeader header="One Time Password">
                <UITextField type="text" name="oneTimePassword" defaultValue={login["otp"]} isReadOnly={true} />
            </UISegmentWithHeader>
            
            <UISegmentWithHeader header="URI">
                <UITextField type="text" name="uri1" defaultValue={login["url"]} iconCss="external alternate icon" isReadOnly={true} />
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