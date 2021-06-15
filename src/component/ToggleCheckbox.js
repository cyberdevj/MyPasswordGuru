import React from "react";

const ToggleCheckbox = (props) => {
    return (
        <div className="field">
            <div className="ui slider checkbox">
                <input type="checkbox" name={props.fieldname} defaultChecked={props.checked} />
                <label>{props.content}</label>
            </div>
        </div>
    );
};

export default ToggleCheckbox;