import React from "react";
import PersonalizeCategory from "./PersonalizeCategory";

class Personalize extends React.Component {
    render() {
        return (
            <form className="ui form">
                <div className="ui toggle checkbox">
                    <input type="checkbox" name="personalization" />
                    <label>Personalize Passwords</label>
                </div>

                <div className="ui tiny">
                    Enable personalization to personalize and improve password suggestions.
                    <br />
                    <br />
                    When you enable personalization, Guru uses your personal information, password preferences, and interests to customize your passwords. Guru will also automatically learn from your password behaviors to suggest better passwords.
                    <br />
                    <br />
                    You can select the categories of information you want Guru to use below.
                    <br />
                    <br />
                    Knowledge Guru learns about you is stored on your device and is never sent to a server.
                </div>

                <PersonalizeCategory />
            </form>
        );
    }
}

export default Personalize;