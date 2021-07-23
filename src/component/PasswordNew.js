import React from "react";

const PasswordNew = (props) => {
    return (
        <div>
            <h3 className="ui header">
                <div className="content">New Password</div>
                <div className="sub header">Your newly generated password will appear here.</div>
            </h3>
            <div className="field">
                <div className="ui icon input">
                    <input type="text" name="newPassword" defaultValue={props.defaultValue} onChange={props.onChange} />
                    <i className="copy outline icon"></i>
                </div>
            </div>
        </div>
    );
};

export default PasswordNew;