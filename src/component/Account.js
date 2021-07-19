import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import faker from "faker";
import AccountPersonal from "./AccountPersonal";
import AccountInterest from "./AccountInterest";
import AuthenticationService from "./AuthenticationService";

const Account = () => {
    const [fullname, setFullname] = useState(null);

    const history = useHistory();

    useEffect(() => {
        let profileResult = AuthenticationService.get("profile");
        if (profileResult["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = profileResult["data"];
        setFullname(data["fullname"]);
    }, [history]);

    return (
        <form className="ui form">
            <div className="ui tiny">
                You can provide additional information to Guru to improve your password suggestions. You are in control of your data, and you can swipe any item to the left to delete it.
                <br />
                <br />
                This data is stored on your device and is never sent to a server.
            </div>

            <AccountPersonal fullname={fullname} region={faker.address.country()} language="English, Chinese, Japanese" age={Math.floor(Math.random() * 82) + 18} company={faker.company.companyName()} />
            <AccountInterest />

            <Link className="fluid ui button" to="/account/personalize">Personalize</Link>
        </form>
    );
}

export default Account;