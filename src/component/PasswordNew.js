import React from "react";

const PasswordNew = (props) => {
    const renderPassword = (password) => {
        let passwordElementArray = [];
        for (let i = 0; i < password.length; i++) {
            if (/^[0-9]$/.test(password[i])) {
                passwordElementArray.push(<span key={i} className="password-numbers float-left color-blue">{password[i]}</span>);
                continue;
            } 
            if (/^[!@#$%^&*]$/.test(password[i])) {
                passwordElementArray.push(<span key={i} className="password-special float-left color-red">{password[i]}</span>);
                continue;
            }
            passwordElementArray.push(<span key={i} className="password-letter float-left">{password[i]}</span>)
        }
        return passwordElementArray;
    }

    return (
        <div>
            <h3 className="ui header">
                <div className="content">New Password</div>
                <div className="sub header">Your newly generated password will appear here.</div>
            </h3>
            <div className="field">
                <div className="ui grid">
                    <div className="twelve wide column">
                        {renderPassword(props.value)}
                    </div>
                    <div className="four wide column">
                        <i className="copy outline icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordNew;