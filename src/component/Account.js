import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import AuthenticationService from "./AuthenticationService";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import ListItem from "./ListItem";
import "react-datepicker/dist/react-datepicker.css";
import UICountryField from "./UICountryField";

const Account = () => {
    const [fullname, setFullname] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [company, setCompany] = useState("");
    const [profileStatus, setProfileStatus] = useState(false);
    
    const [currentPin, setCurrentPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [pinStatus, setPinStatus] = useState(null);
    const [pinError, setPinError] = useState(false);

    const history = useHistory();

    const saveProfile = (e) => {
        e.preventDefault();
        let profile = {
            fullname: fullname,
            country: country,
            language: language,
            birthdate: birthdate,
            company: company
        };
        
        let result = AuthenticationService.set("profile", profile);
        if (result["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        setProfileStatus(true);
        
        setTimeout(() => {
            setProfileStatus(false);
        }, 1000);
    };

    const changePin = (e) => {
        e.preventDefault();
        
        if (!AuthenticationService.passwordVerify(currentPin)) {
            setPinError(true);
            setPinStatus("Invalid PIN provided");
            pinTimeoutStatus();
            return;
        }

        if (newPin !== confirmPin) {
            setPinError(true);
            setPinStatus("New PIN does not match");
            pinTimeoutStatus();
            return;
        }

        if (!AuthenticationService.passwordChange(currentPin, confirmPin)) {
            setPinError(true);
            setPinStatus("Invalid PIN");
            pinTimeoutStatus();
            return;
        }

        setPinStatus("PIN Changed");
        pinTimeoutStatus();
    };

    const pinTimeoutStatus = () => {
            setTimeout(() => {
            setCurrentPin("");
            setNewPin("");
            setConfirmPin("");
            setPinError(false);
            setPinStatus(null);
        }, 1000)
    };

    const setProfile = useCallback((data) => {
        setFullname(data["fullname"] ? data["fullname"] : "");
        setCountry(data["country"] ? data["country"] : "");
        setLanguage(data["language"] ? data["language"] : "");
        setBirthdate(data["birthdate"] ? new Date(data["birthdate"]) : new Date());
        setCompany(data["company"] ? data["company"] : "");
    }, []);

    useEffect(() => {
        let profileResult = AuthenticationService.get("profile");
        if (profileResult["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        let data = profileResult["data"];
        setProfile(data);
    }, [history, setProfile]);

    return (
        <form className="ui form">
            <div className="ui tiny">
                You can provide additional information to Guru to improve your password suggestions.
                <br />
                You are in control of your data.
                <br />
                <br />
                This data is stored on your browser and is never sent to a server.
            </div>

            <UISegmentWithHeader header="Personal Information">
                <UITextField label="Full name" name="fullname" placeholder="Fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
                <UICountryField label="Country" value={country} onChange={(e, {value}) => setCountry(value)} />
                <UITextField label="Language" name="language" placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />
                <div className="field">
                    <label>Birthdate</label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={birthdate} onChange={(date) => setBirthdate(date)} showYearDropdown />
                </div>
                <UITextField label="Company" name="company" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
                <button disabled={profileStatus} className="ui icon button green" onClick={saveProfile}><i className="save outline icon"></i></button>
                {profileStatus ? <small style={{"color": "green"}}>Saved!</small> : null}
            </UISegmentWithHeader>

            <UISegmentWithHeader header="Change Lock PIN">
                <UITextField label="Current PIN" type="password" name="currentPin" placeholder="Current PIN" value={currentPin} onChange={e => setCurrentPin(e.target.value)} />
                <UITextField label="New PIN" type="password" name="newPin" placeholder="New PIN" value={newPin} onChange={e => setNewPin(e.target.value)} />
                <UITextField label="Confirm PIN" type="password" name="confirmPin" placeholder="Confirm PIN" value={confirmPin} onChange={e => setConfirmPin(e.target.value)} />
                <button disabled={pinStatus} className="ui icon button green" onClick={changePin}><i className="save outline icon"></i></button>
                {pinStatus ? <small style={ !pinError ? {"color": "green"} : {"color": "red"}}>{pinStatus}</small> : null}
            </UISegmentWithHeader>

            <UISegmentWithHeader header="Interest">
                <div className="ui celled list">
                    <ListItem title="Linux" content="Computer" />
                    <ListItem title="Apple" content="Computer" />
                    <ListItem title="Dog" content="Animal" />
                    <ListItem title="Cat" content="Animal" />
                    <ListItem title="Hamster" content="Animal" />
                    <ListItem title="Ferrari" content="Car" />
                    <ListItem title="Posche" content="Car" />
                    <ListItem title="Posche" content="Car" />
                    <ListItem title="Giordano" content="Fashion" />
                    <ListItem title="Adidas" content="Fashion" />
                    <ListItem title="Nike" content="Fashion" />
                </div>
            </UISegmentWithHeader>

            <Link className="fluid ui button" to="/account/personalize">Personalize</Link>
        </form>
    );
}

export default Account;