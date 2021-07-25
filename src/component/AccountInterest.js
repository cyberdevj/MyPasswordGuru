import React, { useCallback, useEffect, useState } from "react";
import UISegmentWithHeader from "./UISegmentWithHeader";
import InterestsJson from "../Interests.json";
import UICardItem from "./UICardItem";
import AuthenticationService from "./AuthenticationService";
import { useHistory } from "react-router";

const AccountInterest = () => {
    const [currentInterest, setCurrentInterest] = useState(0)
    const [interestCategory, setInterestCategory] = useState([]);
    const [interestList, setInterestList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [saveStatus, setSaveStatus] = useState(false);

    const history = useHistory();

    const goBack = () => {
        history.push("/account");
    };

    const selectInterestType = (id) => {
        setCurrentInterest(id);
        
        let list = [];
        for (let i = 0; i < InterestsJson[id]["words"].length; i++) {
            list.push({
                name: InterestsJson[id]["words"][i],
                type: InterestsJson[id]["name"],
            });
        }
        setInterestList(list);
    };

    const addInterest = (id) => {
        let interestObject = {
            name: InterestsJson[currentInterest]["words"][id],
            type: InterestsJson[currentInterest]["name"]
        };
        if (!selectedList.map(i => i.name).includes(interestObject.name))
            setSelectedList([...selectedList, interestObject]);
    };

    const deleteInterest = (id) => {
        setSelectedList(selectedList.filter((_, index) => index !== id));
    };

    const saveInterest = () => {
        AuthenticationService.set("interests", selectedList);
        setSaveStatus(true);
        setTimeout(() => {
            setSaveStatus(false);
        }, 1000);
    };

    const loadInterestList = useCallback(() => {
        setCurrentInterest(0);
        let category = [];
        for (let i = 1; i < InterestsJson.length; i++) {
            category.push({
                name: InterestsJson[i]["name"]
            });
        }
        setInterestCategory(category);
    }, []);

    const loadSelectedList = useCallback(() => {
        let data = AuthenticationService.get("interests");
        if (data["status"] !== "OK") {
            AuthenticationService.sessionDestroy();
            history.push("/");
        }

        setSelectedList(data["data"]);
    }, [history]);

    useEffect(() => {
        loadInterestList();
        loadSelectedList();
    }, [loadInterestList, loadSelectedList]);

    return (
        <div className="ui container">
            <div className="ui tiny">
                You can manage your interest.
                <br />
                Your interest will be used as a factor to generate your new password.
            </div>
            <UISegmentWithHeader header="Manage Interest" backButton="true" backOnClick={() => goBack()}>
                <div className="ui three column grid">
                    <div className="column">
                        <div className="ui sub header">
                            Interests Category
                        </div>
                        <div className="ui segment h-400 overflow">
                            <div className="ui cards">
                                {interestCategory.map((cat, index) => <UICardItem className={`fluid cursor-pointer ${cat.highlight ? "hightlight" : null}`} key={index} title={cat.name.charAt(0).toUpperCase() + cat.name.slice(1)} meta={cat.type} onClick={() => selectInterestType(index + 1)} />)}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui sub header">
                            {currentInterest ? interestCategory[currentInterest - 1]["name"] : "Interest"}
                        </div>
                        <div className="ui segment h-400 overflow">
                            <div className="ui cards">
                                {currentInterest > 0 ? interestList.map((interest, index) => <UICardItem className="fluid cursor-pointer" key={index} title={interest.name.charAt(0).toUpperCase() + interest.name.slice(1)} meta={interest.type} onClick={() => addInterest(index)} />) : null}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui sub header">
                            Selected Interests
                        </div>
                        <div className="ui segment h-400 overflow">
                            {selectedList.map((interest, index) => (
                                <UICardItem className="fluid cursor-pointer" key={index} title={interest.name.charAt(0).toUpperCase() + interest.name.slice(1)} meta={interest.type} close="true" closeOnClick={() => deleteInterest(index)} />
                            ))}
                        </div>
                    </div>
                </div>
                <br />
                <button className="ui fluid button blue" disabled={saveStatus} onClick={() => saveInterest()}>Save</button>
                {saveStatus ? <div className="ui message green">Saved</div> : null}
            </UISegmentWithHeader>
        </div>
    );
};

export default AccountInterest;