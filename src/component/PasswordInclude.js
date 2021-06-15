import React from "react";

const PasswordInclude = () => {
    return (
        <div>
            <h3 className="ui header">
                <div className="content">Words to Include</div>
                <div className="sub header">We will try to generate your new password with these words.</div>
            </h3>
            <div className="field">
                <input type="text" name="wordsToInclude" placeholder="Words to Include" />
            </div>
        </div>
    );
};

export default PasswordInclude;