import React from "react";
import PasswordNew from "./PasswordNew";
import PasswordCharacters from "./PasswordCharacters";
import PasswordTopics from "./PasswordTopics";
import PasswordInclude from "./PasswordInclude";

class GenerateCustom extends React.Component {
    render() {
        return (
            <div className="ui container">
                <div className="ui tiny">
                    Generate a password based on data from your personal information, existing passwords, and other behavior. You can customize these options from the Settings tab.
                </div>
                <br />
                <form className="ui form">
                    <PasswordNew />

                    <br />

                    <PasswordCharacters />

                    <br />

                    <PasswordTopics />

                    <br />

                    <PasswordInclude />

                    <br />
                    
                    <button className="ui fluid button" type="button">Generate</button>
                </form>
            </div>
        );
    };
};

export default GenerateCustom;