import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import Papa from "papaparse";
import AuthenticationService from "./AuthenticationService";
import UISegmentWithHeader from "./UISegmentWithHeader";
import UITextField from "./UITextField";
import UICardItem from "./UICardItem";
import UICountryField from "./UICountryField";
import { Card } from "semantic-ui-react";

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

    const [interests, setInterests] = useState([]);

    const [importStatus, setImportStatus] = useState(false);

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

    const importGuru = (e) => {
        e.preventDefault();
        if (importStatus) return;

        let input = document.createElement("input");
        input.type = "file";
        input.onchange = e => {
            let file = e.target.files[0];

            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                let loginAccounts = [];
                let index = {
                    name: -1,
                    url: -1,
                    username: -1,
                    password: -1,
                    otp: -1
                };
                content.split("\r\n").forEach((row, i1) => {
                    if (i1 === 0) {
                        row.split(",").map((col, i2) => {
                            if (col.toLowerCase() === "name") index.name = i2;
                            if (col.toLowerCase() === "title") index.name = i2;
                            if (col.toLowerCase() === "url") index.url = i2;
                            if (col.toLowerCase() === "loginurl") index.url = i2;
                            if (col.toLowerCase() === "username") index.username = i2;
                            if (col.toLowerCase() === "password") index.password = i2;
                            if (col.toLowerCase() === "otpsecret") index.otp = i2;
                            if (col.toLowerCase() === "otpauth") index.otp = i2;
                            return null;
                        });
                    } else {
                        let rowParse = Papa.parse(row);
                        rowParse = rowParse["data"][0];
                        if (rowParse) {
                            let loginItem = {
                                name: rowParse[index.name] ? rowParse[index.name] : "",
                                url: rowParse[index.url] ? rowParse[index.url] : "",
                                username: rowParse[index.username] ? rowParse[index.username] : "",
                                password: rowParse[index.password] ? rowParse[index.password] : "",
                                otp: rowParse[index.otp] ? rowParse[index.otp] : ""
                            };
                            loginAccounts.push(loginItem);
                        }
                    }
                });
                let data = AuthenticationService.get("logins");
                data = data["data"] ? data["data"] : [];

                loginAccounts.forEach(x1 => {
                    data.splice(data.findIndex(x2 => x1.name === x2.name && x1.type === x2.type), 1);
                });
                loginAccounts = [...loginAccounts, ...data];
                loginAccounts.forEach((v, i) => {
                    v["id"] = (i + 1);
                });
                AuthenticationService.set("logins", loginAccounts);
                setImportStatus(true);
                setTimeout(() => {
                    setImportStatus(false);
                }, 1000)
            }
        }
        input.click();
        
    };

    const exportGuru = (e) => {
        e.preventDefault();

        let data = AuthenticationService.get("logins");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        data = data["data"].map(({id, ...keepAttrs}) => keepAttrs);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Title,Url,Username,Password,OTPAuth\r\n";
        csvContent += Papa.unparse(data, {
            header: false
        });
        
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Guru_Export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link.remove();
    };

    const clearTrainingData = (e) => {
        e.preventDefault();
        AuthenticationService.delete("training");
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

    const loadProfileData = useCallback(() => {
        let data = AuthenticationService.get("profile");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        data = data["data"];
        setFullname(data["fullname"] ? data["fullname"] : "");
        setCountry(data["country"] ? data["country"] : "");
        setLanguage(data["language"] ? data["language"] : "");
        setBirthdate(data["birthdate"] ? new Date(data["birthdate"]) : new Date());
        setCompany(data["company"] ? data["company"] : "");
    }, [history]);

    const loadInterestsList = useCallback(() => {
        let data = AuthenticationService.get("interests");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }
        data = data["data"];
        setInterests(data ? data : []);
    }, [history]);

    useEffect(() => {
        loadProfileData();
        loadInterestsList();
    }, [history, loadProfileData, loadInterestsList]);

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

            <UISegmentWithHeader header="Import / Export">
                {importStatus ? <div className="ui message green">Data successfully imported!</div> : null}
                <div className="ui two column grid">
                    <div className="column">
                        <button className="ui button blue fluid" onClick={e => importGuru(e)}>Import</button>
                    </div>
                    <div className="column">
                        <button className="ui button blue fluid" onClick={e => exportGuru(e)}>Export</button>
                    </div>
                </div>
            </UISegmentWithHeader>


            <UISegmentWithHeader header="Interest" >
                {interests.length > 0 ? (
                    <Card.Group>
                        {interests.map((interest, index) => <UICardItem className="column" key={index} title={interest.name} meta={interest.type} />)}
                    </Card.Group>
                ) : <div className="ui message yellow">No interest selected yet</div>}
                <br />
                <Link className="ui button blue fluid" to="/account/interest">Manage</Link>
            </UISegmentWithHeader>

            <button className="ui button fluid" onClick={e => clearTrainingData(e)}>Clear Training Data</button>
        </form>
    );
}

export default Account;