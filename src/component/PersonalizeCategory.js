import React from "react";
import ToggleCheckbox from "./ToggleCheckbox";

const PersonalizeCategory = () => {
    return (
        <div className="ui segment">
            <div className="ui toggle checkbox">
                <ToggleCheckbox fieldname="category" content="Personal Information" checked="checked" />
                <ToggleCheckbox fieldname="category" content="Interest &amp; Topics" checked="checked" />
                <ToggleCheckbox fieldname="category" content="Existing Password" checked="" />
                <ToggleCheckbox fieldname="category" content="Automatically Learned Knowledge" checked="checked" />
            </div>
        </div>
    );
};

export default PersonalizeCategory;