import React from "react";

const NormalCheckbox = (props) => {
    let subText = "";
    for (let i = 0; i < props.examples.length; i++) {
        subText += props.examples[i] + "\n";
    }

    return (
        <div className="ui segment">
            <div className="ui checkbox new-line">
                <input type="checkbox" />
                <label>
                    <span className="text-bold">
                        {props.label}
                    </span>
                    <br />
                    <span className="tiny color-grey">
                        {subText}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default NormalCheckbox;