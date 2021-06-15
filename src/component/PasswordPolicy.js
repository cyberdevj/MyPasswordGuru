import React from "react";
import NormalCheckbox from "./NormalCheckbox";

const PasswordPolicy = () => {
    return (
        <div>
            <h3 className="ui header">
                <div className="content">Password Policy</div>
                <div className="sub header">Select a password policy we should adhere.</div>
            </h3>
            <NormalCheckbox label="Work or School" examples={["Must contain lower and UPPERCASE letters", "Must contain at least 1 number", "Must contain at least 1 symbol", "Must be 8 or more characters long"]} />
            <NormalCheckbox label="Internet Banking, Internet Services, Accounts Containing Sensitive Data" examples={["Must container lowercase and UPPERCASE letters", "Must contain at least 1 number or symbol", "Must be 8 or more characters long"]} />
            <NormalCheckbox label="Social Media, Image/Video Sharing Sites" examples={["Must container lowercase and UPPERCASE letters", "Must be 8 or more characters long"]} />
            <NormalCheckbox label="PIN" examples={["Contains number only", "Must be 8 or more digits long"]} />
        </div>
    );
};

export default PasswordPolicy;