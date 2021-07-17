import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const AccountNew = () => {
    const [username, setUsername] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [pin, setPin] = useState(null);

    const history = useHistory();

    const createNewUser = (e) => {
        e.preventDefault();

        AuthenticationService.setAuth({
            "username": username,
            "data": {
                "profile": {
                    "fullname": fullname
                }
            }
        }, pin, (data) => {
            history.push("/");
        });
    }

    return (
        <div className="ui center-screen">
            <h1 className="ui header">
                <div className="content">Password Guru</div>
            </h1>
            <div className="ui form">
                <div className="field w-250">
                    <label htmlFor="formUsername">Username</label>
                    <input id="formUsername" type="text" name="username" placeholder="username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="field w-250">
                    <label htmlFor="formFullname">Full Name</label>
                    <input id="formFullname" type="text" name="fullname" placeholder="fullname" defaultValue={fullname} onChange={e => setFullname(e.target.value)} />
                </div>
                <div className="field w-250">
                    <label htmlFor="formPin">PIN</label>
                    <input id="formPin" type="password" name="pin" placeholder="pin" defaultValue={pin} onChange={e => setPin(e.target.value)} />
                </div>
                <div className="ui grid">
                    <div className="eight wide column">
                        <Link className="ui fluid button" to="/">Back</Link>
                    </div>
                    <div className="eight wide column">
                        <button className="ui fluid green button" onClick={createNewUser}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountNew;