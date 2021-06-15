import React from "react";
import NormalCheckbox from "./NormalCheckbox";

const PasswordCharacters = () => {
    return (
        <div>
            <h3 className="ui header">
                <div className="content">Characters to Include</div>
                <div className="sub header">Select specific characters you wish to include into your password.</div>
            </h3>
            <NormalCheckbox label="Lowercase Letters" examples={["abcdefghijklmnopqrstuvwxyz"]} />
            <NormalCheckbox label="Uppercase Letters" examples={["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]} />
            <NormalCheckbox label="Numbers" examples={["0123456789"]} />
            <NormalCheckbox label="Symbols" examples={["!#$%&()@_"]} />
        </div>
    );
};

export default PasswordCharacters;