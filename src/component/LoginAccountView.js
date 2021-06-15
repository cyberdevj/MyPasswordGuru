import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";

class LoginAccountView extends React.Component {
    render() {
        return (
            <form className="ui form">
                <h1 className="ui header">
                    <div className="ui content">Account Information</div>
                </h1>
                
                <UISegmentWithProfilePicture src={faker.image.image()}>
                    <div className="header">{faker.company.companyName()}</div>
                    <div className="description">
                        <button className="ui fluid button">Go to Login Page</button>
                    </div>
                </UISegmentWithProfilePicture>

                <UISegmentWithHeader header="Credentials">
                    <UITextField label="Username" type="text" name="username" defaultValue={faker.internet.userName()} isReadOnly={true} />
                    <UITextField label="Password" type="password" name="username" defaultValue={faker.internet.userName()} iconCss="copy outline icon" isReadOnly={true} />
                </UISegmentWithHeader>

                <UISegmentWithHeader header="One Time Password">
                    <UITextField type="text" name="oneTimePassword" defaultValue={faker.datatype.number(999999)} isReadOnly={true} />
                </UISegmentWithHeader>
                
                <UISegmentWithHeader header="URI">
                    <UITextField type="text" name="uri1" defaultValue={faker.internet.url()} iconCss="external alternate icon" isReadOnly={true} />
                </UISegmentWithHeader>

                <Link className="ui icon button positive" to="/login/edit"><i className="edit outline icon"></i></Link>
                <Link className="ui icon button" to="/login/list"><i className="arrow alternate circle left icon"></i></Link>
            </form>
        );
    }
};

export default LoginAccountView;