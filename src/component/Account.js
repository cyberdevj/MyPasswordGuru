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
    const [fullname, setFullname] = useState(null);
    const [country, setCountry] = useState(null);
    const [language, setLanguage] = useState(null);
    const [birthdate, setBirthdate] = useState(new Date());
    const [company, setCompany] = useState(null);
    const [saved, setSaved] = useState(false);

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
        setSaved(true);
        
        setTimeout(() => {
            setSaved(false);
        }, 1000);
    };

    const setProfile = useCallback((data) => {
        setFullname(data["fullname"]);
        setCountry(data["country"]);
        setLanguage(data["language"]);
        setBirthdate(new Date(data["birthdate"]));
        setCompany(data["company"]);
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
                <UITextField label="Full name" name="fullname" placeholder="Fullname" defaultValue={fullname} onChange={e => setFullname(e.target.value)} />
                <UICountryField label="Country" value={country} onChange={(e, {value}) => setCountry(value)} />
                <UITextField label="Language" name="language" placeholder="Language" defaultValue={language} onChange={e => setLanguage(e.target.value)} />
                <div className="field">
                    <label>Birthdate</label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={birthdate} onChange={(date) => setBirthdate(date)} showYearDropdown />
                </div>
                <UITextField label="Company" name="company" placeholder="Company" defaultValue={company} onChange={e => setCompany(e.target.value)} />
                <button disabled={saved} className="ui icon button green" onClick={saveProfile}><i className="save outline icon"></i></button>
                {saved ? <small style={{"color": "green"}}>Saved!</small> : null}
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