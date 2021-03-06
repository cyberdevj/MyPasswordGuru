import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthenticationService from "./AuthenticationService";
import GeneratorService from "./GeneratorService";
import PasswordNew from "./PasswordNew";
import UICheckBox from "./UICheckBox";
import UIRange from "./UIRange";
import UITextField from "./UITextField";

const GeneratePassword = () => {
    const [password, setPassword] = useState({});
    const [options, setOptions] = useState({
        length: 10,
        uppercase: true,
        lowercase: true,
        numbers: true,
        special: true,
        default: {
            numbers: 1,
            special: 1
        }
    });
    const [interests, setInterests] = useState([]);
    const [disableInterest, setDisableInterest] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, setCopiedText] = useState("");
    const [updateState, setUpdateState] = useState({
        id: null,
        state: null
    });

    const history = useHistory();

    const MIN_CHARACTERS = 0;
    const MAX_CHARACTERS = 9;
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 128;

    const checkboxOnClick = (index) => {
        if (!options.uppercase && !options.lowercase) return;
        let array = [...interests];
        array[index]["checked"] = array[index]["checked"] ? false : true;
        setInterests(array);
    };

    const handleNumberChange = (e, key) => {
        let temp = {...options};
        let value = e.target.value;
        let requiredPasswordLength = 0;
        if (temp.uppercase) requiredPasswordLength++;
        if (temp.lowercase) requiredPasswordLength++;
        if (temp.special)   requiredPasswordLength++;
        if (!/^[0-9]+$/.test(value)) {
            e.preventDefault();
            return;
        }
        value = parseInt(e.target.value);

        if ((key === "numbers" || key === "special") && value >= MIN_CHARACTERS && value <= MAX_CHARACTERS) {
            temp.default[key] = value;
            requiredPasswordLength += temp.default.numbers + temp.default.special;
        }

        let length = temp.length;
        if (key === "length" && value >= MIN_LENGTH && value <= MAX_LENGTH) {
            temp[key] = value;
            length = value;
            requiredPasswordLength += temp.default.numbers + temp.default.special;
        }
        
        if (length <= requiredPasswordLength) temp.length = requiredPasswordLength;
        setOptions(temp);
    };

    const setOptionsCheckbox = (key) => {
        setOptions({...options, [key]: !options[key]});

        let disableInterest = false;
        if (key === "uppercase") {
            disableInterest = (!(!options[key]) && !options.lowercase);
        }
        if (key === "lowercase") {
            disableInterest = (!(!options[key]) && !options.uppercase);
        }
        setDisableInterest(disableInterest);
        setInterests(interests.map(v => ({...v, checked: !disableInterest})));
    };
    
    const setInterestCheckbox = () => {
        setInterests(interests.map(v => ({...v, checked: disableInterest})));
        setDisableInterest((options.uppercase || options.lowercase) ? !disableInterest : true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password.new.join(""));
        if (isCopied) return;
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);

        if (copiedText === password.new.join("")) return;
        setCopiedText(password.new.join(""));
        GeneratorService.saveInterestWeight();
    };

    const savePassword = (e, type) => {
        e.preventDefault();
        GeneratorService.setUpdateState(type);
        GeneratorService.saveInterestWeight();
        let url = `/login/${updateState.data.id ? `edit/${updateState.data.id}` : `new`}`;
        history.push(url);
    };

    const loadInterests = useCallback(() => {
        let data = AuthenticationService.get("interests");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        data = data["data"] ? data["data"] : [];
        setInterests(data.map(v => ({...v, checked: true})));
    }, [history]);

    const generateNewPassword = useCallback(() => {
        let filterInterests = interests.filter(v => v.checked).map(({checked, ...remainingAttr}) => remainingAttr);
        let newPassword = GeneratorService.generatePassword(options, filterInterests);
        setPassword(newPassword);
    }, [interests, options]);

    useEffect(() => {
        loadInterests();
        setUpdateState(GeneratorService.getUpdateState());
    }, [loadInterests]);
    
    useEffect(() => {
        generateNewPassword();
    }, [generateNewPassword])

    return (
        <div className="ui container">
            <div className="ui tiny">
                Generate a password based on data from your personal information, existing passwords, and other behavior.
            </div>
            <br />
            <form className="ui form" spellCheck="false">
                <PasswordNew value={password} onChange={e => setPassword(e.target.value)} copyOnClick={() => copyToClipboard()} isCopied={isCopied} />
                {password.interests && password.interests.length > 0 ? <div className="mt-10">{password.interests.map((v, i) => <div key={i} className="ui red label">{v.name}</div>)}</div> : null}
                <div className="mt-10"><button className="ui fluid button blue" type="button" onClick={generateNewPassword}>Generate</button></div>
                {updateState.state === "R" ? (<div className="mt-10"><button className="ui fluid button green" onClick={e => savePassword(e, "S")}>Use This Password</button></div>) : null}
                {updateState.state === "R" ? (<div className="mt-10"><button className="ui fluid button red" onClick={e => savePassword(e, "C")}>Cancel</button></div>) : null}
                <h3 className="ui header">
                    <div className="content">Options</div>
                    <div className="sub header">Customize how we should generate your password.</div>
                </h3>
                <UIRange label="Length" type="number" min={MIN_LENGTH} max={MAX_LENGTH} value={options.length} onChange={e => handleNumberChange(e, "length")} />
                <div className="ui two column grid">
                    <UICheckBox className="column" label="A-Z"          onClick={() => setOptionsCheckbox("uppercase")} checked={options.uppercase} readOnly />
                    <UICheckBox className="column" label="a-z"          onClick={() => setOptionsCheckbox("lowercase")} checked={options.lowercase} readOnly />
                    <UICheckBox className="column" label="0-9"          onClick={() => setOptionsCheckbox("numbers")}   checked={options.numbers}   readOnly />
                    <UICheckBox className="column" label="!@#$%^&amp;*" onClick={() => setOptionsCheckbox("special")}   checked={options.special}   readOnly />
                </div>
                <div className="ui two column grid">
                    <UITextField className="column" type="number" label="Minimum Numbers" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={options.default.numbers} onChange={e => handleNumberChange(e, "numbers")} />
                    <UITextField className="column" type="number" label="Minimum Special" min={MIN_CHARACTERS} max={MAX_CHARACTERS} value={options.default.special} onChange={e => handleNumberChange(e, "special")} />
                </div>
                <h3 className="ui header">
                    <div className="content">Interests</div>
                    <div className="sub header">You may select which interest you wish to include for your passwords</div>                    
                </h3>
                <div className="ui one column grid">
                    <UICheckBox className="column" label="Interests" onClick={() => setInterestCheckbox()} disabled={!(options.uppercase || options.lowercase)} checked={!disableInterest} readOnly />
                </div>
                <div className="ui two column grid">
                    {interests.map((interest, index) => (
                        <UICheckBox className="column" key={index} label={interest["name"]} sub={interest["type"]} value={interest["name"]} checked={interest["checked"]} highlight={password.interests.findIndex(x => x.name === interest.name && x.type === interest.type) !== -1 ? "bg-green" : null} onClick={() => checkboxOnClick(index)} readOnly disabled={disableInterest} />
                    ))}
                </div>
            </form>
        </div>
    );
};

export default GeneratePassword;