import React, { useState } from "react";
import GeneratorService from "./GeneratorService";
import PasswordNew from "./PasswordNew";
import UICheckBox from "./UICheckBox";
import UIRange from "./UIRange";

const GeneratePassword = () => {
    const [password, setPassword] = useState("");
    const [optLength, setOptLength] = useState(14);
    const [optUppercase, setOptUppercase] = useState(true);
    const [optLowercase, setOptLowercase] = useState(true);
    const [optNumbers, setOptNumbers] = useState(true);
    const [optSpecial, setOptSpecial] = useState(true);

    const generateNewPassword = () => {
        console.log(optUppercase)
        // GeneratorService.basicPassword();
    };

    const handleCbChange = (e, type) => {
        if (type === "UC") setOptUppercase(optUppercase ? false : true);
        if (type === "LC") setOptLowercase(optLowercase ? false : true);
        if (type === "NUM") setOptNumbers(optNumbers ? false : true);
        if (type === "SC") setOptSpecial(optSpecial ? false : true);
    };

    return (
        <div className="ui container">
            <div className="ui tiny">
                Generate a password based on data from your personal information, existing passwords, and other behavior.
            </div>
            <br />
            <form className="ui form">
                <PasswordNew value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button className="ui fluid button blue" type="button" onClick={generateNewPassword}>Generate</button>
                <h3 className="ui header">
                    <div className="content">Options</div>
                    <div className="sub header">Customize how we should generate your password.</div>
                </h3>
                <UIRange label="Length" type="number" max={128} value={optLength} onChange={e => setOptLength(e.target.value)} />
                <div className="ui four column grid">
                    <UICheckBox className="column" id="ucid" label="A-Z" onClick={e => handleCbChange(e, "UC")} checked={optUppercase} readOnly />
                    <UICheckBox className="column" id="lcid" label="a-z" onClick={e => handleCbChange(e, "LC")} checked={optLowercase} readOnly />
                    <UICheckBox className="column" id="numid" label="0-9" onClick={e => handleCbChange(e, "NUM")} checked={optNumbers} readOnly />
                    <UICheckBox className="column" id="scid" label="!@#$%^&amp;*" onClick={e => handleCbChange(e, "SC")} checked={optSpecial} readOnly />
                </div>
            </form>
        </div>
    );
};

export default GeneratePassword;