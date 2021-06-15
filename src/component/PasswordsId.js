import React from "react";
import faker from "faker";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";

class PasswordsId extends React.Component {
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
                    <UITextField label="Username" type="text" name="username" defaultValue={faker.internet.userName()} />
                    <UITextField label="Password" type="password" name="username" defaultValue={faker.internet.userName()} iconCss="copy outline icon" />
                </UISegmentWithHeader>

                <UISegmentWithHeader header="One Time Password">
                    <UITextField type="text" name="oneTimePassword" defaultValue={faker.datatype.number(999999)} />
                </UISegmentWithHeader>
                
                <UISegmentWithHeader header="URL">
                    <UITextField label="URI 1" type="text" name="uri1" defaultValue={faker.internet.url()} iconCss="external alternate icon" />
                </UISegmentWithHeader>
            </form>
        );
    }
};

export default PasswordsId;