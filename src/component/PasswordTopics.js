import React from "react";
import NormalCheckbox from "./NormalCheckbox";

const PasswordTopics = () => {
    return (
        <div>
            <h3 className="ui header">
                <div className="content">Recommended Topics</div>
                <div className="sub header">Select a topic you'd like to use in your password. Words relevant to the topic will be included.</div>
            </h3>
            <NormalCheckbox label="Computers" examples={["Examples: apple, lenovo, windows, macos"]} />
            <NormalCheckbox label="Japan" examples={["Examples: anime, tokyo, osaka, nihongo"]} />
            <NormalCheckbox label="Music" examples={["Examples: piano, violin, xylophone"]} />
            <NormalCheckbox label="Singapore" examples={["Examples: merlion, singapore"]} />
        </div>
    );
};

export default PasswordTopics;