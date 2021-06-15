import React from "react";
import { Link, useLocation } from "react-router-dom";
import faker from "faker";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";

const LoginAccountEdit = () => {
    let account = {
        title: "Add New Account",
        name: null,
        username: null,
        password: null,
        otp: null,
        url: null,
        prevLocation: "/login/list"
    };

    const location = useLocation().pathname;
    if (location.includes("login") && location.includes("edit")) {
        account = {
            title: "Edit Account Information",
            name: faker.company.companyName(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            otp: faker.datatype.number(999999),
            url: faker.internet.url(),
            prevLocation: "/login/view"
        };
    }

    return (
        <form className="ui form">
        <h1 className="ui header">
            <div className="ui content">{account.title}</div>
        </h1>
        
        <UISegmentWithProfilePicture src={faker.image.image()}>
            <UITextField label="Account Name" type="text" name="accountName" defaultValue={account.name} />
        </UISegmentWithProfilePicture>

        <UISegmentWithHeader header="Credentials">
            <UITextField label="Username" type="text" name="username" defaultValue={account.username} />
            <UITextField label="Password" type="password" name="password" iconCss="copy outline icon" defaultValue={account.password} />
        </UISegmentWithHeader>

        <UISegmentWithHeader header="One Time Password">
            <UITextField type="text" name="oneTimePassword" defaultValue={account.otp} />
        </UISegmentWithHeader>
        
        <UISegmentWithHeader header="URL">
            <UITextField type="text" name="uri" iconCss="external alternate icon" defaultValue={account.url} />
        </UISegmentWithHeader>

        
        <Link className="ui icon button positive" to={account.prevLocation}><i className="save outline icon"></i></Link>
        <Link className="ui icon button" to={account.prevLocation}><i className="window close outline icon"></i></Link>
    </form>
    );
};

export default LoginAccountEdit;