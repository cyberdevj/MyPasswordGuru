import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthenticationService from "./AuthenticationService";
import GeneratorService from "./GeneratorService";
import PasswordNew from "./PasswordNew";
import UICheckBox from "./UICheckBox";
import UIRange from "./UIRange";
import UITextField from "./UITextField";

const GeneratePassword = () => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState({
        length: 14,
        uppercase: true,
        lowercase: true,
        numbers: true,
        special: true,
        default: {
            numbers: 3,
            special: 3
        }
    });
    const [interests, setInterests] = useState([]);

    const history = useHistory();

    const MIN_CHARACTERS = 0;
    const MAX_CHARACTERS = 9;
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 128;

    const generateNewPassword = useCallback(() => {
        let newPassword = GeneratorService.generatePassword(options);
        setPassword(newPassword);
    }, [options]);

    const checkboxOnClick = (index) => {
        let array = [...interests];
        array[index]["checked"] = array[index]["checked"] ? false : true;
        console.log(array[index]);
        setInterests(array);
    };

    const handleNumberChange = (e, key) => {
        let value = parseInt(e.target.value);
        let requiredPasswordLength = 0;
        if (options.uppercase) requiredPasswordLength++;
        if (options.lowercase) requiredPasswordLength++;
        if (options.special)   requiredPasswordLength++;

        if (!/^[0-9]+$/.test(value)) {
            e.preventDefault();
            return;
        }

        if ((key === "numbers" || key === "special") && value >= MIN_CHARACTERS && value <= MAX_CHARACTERS) {
            setOptions({...options,
                default: {...options.default, [key]: value}
            });
            requiredPasswordLength += options.default.numbers + options.default.special;
        }

        
        let length = options.length;
        if (key === "length" && value >= MIN_LENGTH && value <= MAX_LENGTH) {
            setOptions({...options, [key]: value});
            length = value;
            requiredPasswordLength += options.default.numbers + options.default.special;
        }
        
        if (length <= requiredPasswordLength) setOptions({...options, length: requiredPasswordLength});
    };

    const loadInterests = useCallback(() => {
        let data = AuthenticationService.get("interests");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        data = data["data"].map(v => ({...v, checked: true}));
        setInterests(data);
    }, [history]);

    useEffect(() => {
        generateNewPassword();
        loadInterests();
    }, [generateNewPassword, loadInterests]);

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
                <UIRange label="Length" type="number" min={MIN_LENGTH} max={MAX_LENGTH} value={options.length} onChange={e => handleNumberChange(e, "length")} />
                <div className="ui four column grid">
                    <UICheckBox className="column" label="A-Z"          onClick={e => setOptions({...options, uppercase: options.uppercase ? false : true})} checked={options.uppercase} readOnly />
                    <UICheckBox className="column" label="a-z"          onClick={e => setOptions({...options, lowercase: options.lowercase ? false : true})} checked={options.lowercase} readOnly />
                    <UICheckBox className="column" label="0-9"          onClick={e => setOptions({...options, numbers:   options.numbers ? false : true})}   checked={options.numbers}   readOnly />
                    <UICheckBox className="column" label="!@#$%^&amp;*" onClick={e => setOptions({...options, special:   options.special ? false : true})}   checked={options.special}   readOnly />
                </div>
                <div className="ui two column grid">
                    <UITextField className="column" type="number" label="Minimum Numbers" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={options.default.numbers} onChange={e => handleNumberChange(e, "numbers")} />
                    <UITextField className="column" type="number" label="Minimum Special" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={options.default.special} onChange={e => handleNumberChange(e, "special")} />
                </div>
                <h3 className="ui header">
                    <div className="content">Interests</div>
                    <div className="sub header">You may select which interest you wish to include for your passwords</div>
                </h3>
                <div className="ui three column grid">
                    {interests.map((interest, index) => (
                        <UICheckBox className="column" key={index} label={interest["name"]} sub={interest["type"]} value={interest["name"]} checked={interest["checked"]} onClick={() => checkboxOnClick(index)} readOnly />
                    ))}
                </div>
            </form>
        </div>
    );
};

export default GeneratePassword;