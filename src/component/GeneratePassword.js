import React, { useCallback, useEffect, useState } from "react";
import GeneratorService from "./GeneratorService";
import PasswordNew from "./PasswordNew";
import UICheckBox from "./UICheckBox";
import UIRange from "./UIRange";
import UITextField from "./UITextField";

const GeneratePassword = () => {
    const [password, setPassword] = useState("");
    const [passLength, setPassLength] = useState(14);
    const [passUpper, setPassUpper] = useState(true);
    const [passLower, setPassLower] = useState(true);
    const [passNumbers, setPassNumbers] = useState(true);
    const [passSpecial, setPassSpecial] = useState(true);

    const [minNumbers, setMinNumbers] = useState(3);
    const [minSpecial, setMinSpecial] = useState(3);

    const MIN_CHARACTERS = 0;
    const MAX_CHARACTERS = 9;
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 128;

    const generateNewPassword = useCallback(() => {
        let newPassword = GeneratorService.generatePassword(passLength, (passUpper), (passLower), (passNumbers), (passSpecial), parseInt(minNumbers), parseInt(minSpecial));
        setPassword(newPassword);
    }, [passLength, passUpper, passLower, passNumbers, passSpecial, minNumbers, minSpecial]);

    const handleCbChange = (e, type) => {
        if (type === "UC") setPassUpper(passUpper ? false : true);
        if (type === "LC") setPassLower(passLower ? false : true);
        if (type === "NUM") setPassNumbers(passNumbers ? false : true);
        if (type === "SC") setPassSpecial(passSpecial ? false : true);
    };

    const handleNumberChange = (e, type) => {
        let len = passLength;
        let passSpacing = 0;
        if (passUpper) passSpacing++;
        if (passLower) passSpacing++;
        if (passSpecial) passSpacing++;

        let numRegex = /^[0-9]+$/;
        if (!numRegex.test(e.target.value)) {
            e.preventDefault();
            return;
        }

        if (type === "MIN_NUM" && e.target.value >= MIN_CHARACTERS && e.target.value <= MAX_CHARACTERS) {
            setMinNumbers(e.target.value);
            passSpacing += parseInt(e.target.value) + parseInt(minSpecial);
        }
        if (type === "MIN_SPC" && e.target.value >= MIN_CHARACTERS && e.target.value <= MAX_CHARACTERS) {
            setMinSpecial(e.target.value);
            passSpacing += parseInt(e.target.value) + parseInt(minNumbers);
        }
        if (type === "LEN" && e.target.value >= MIN_LENGTH && e.target.value <= MAX_LENGTH) {
            setPassLength(e.target.value);
            len = e.target.value;
            passSpacing += parseInt(minNumbers) + parseInt(minSpecial);
        }
        
        if (len <= passSpacing) setPassLength(passSpacing);
    };

    useEffect(() => {
        generateNewPassword();
    }, [generateNewPassword]);

    return (
        <div className="ui container">
            <div className="ui tiny">
                Generate a password based on data from your personal information, existing passwords, and other behavior.
            </div>
            <br />
            <form className="ui form" spellCheck="false">
                <PasswordNew value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button className="ui fluid button blue" type="button" onClick={generateNewPassword}>Generate</button>
                <h3 className="ui header">
                    <div className="content">Options</div>
                    <div className="sub header">Customize how we should generate your password.</div>
                </h3>
                <UIRange label="Length" type="number" min={MIN_LENGTH} max={MAX_LENGTH} value={passLength} onChange={e => handleNumberChange(e, "LEN")} />
                <div className="ui four column grid">
                    <UICheckBox className="column" label="A-Z" onClick={e => handleCbChange(e, "UC")} checked={passUpper} readOnly />
                    <UICheckBox className="column" label="a-z" onClick={e => handleCbChange(e, "LC")} checked={passLower} readOnly />
                    <UICheckBox className="column" label="0-9" onClick={e => handleCbChange(e, "NUM")} checked={passNumbers} readOnly />
                    <UICheckBox className="column" label="!@#$%^&amp;*" onClick={e => handleCbChange(e, "SC")} checked={passSpecial} readOnly />
                </div>
                <div className="ui two column grid">
                    <UITextField className="column" type="number" label="Minimum Numbers" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={minNumbers} onChange={e => handleNumberChange(e, "MIN_NUM")} />
                    <UITextField className="column" type="number" label="Minimum Special" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={minSpecial} onChange={e => handleNumberChange(e, "MIN_SPC")} />
                </div>
            </form>
        </div>
    );
};

export default GeneratePassword;