import React from "react";

const renderLabel = (label) => {
    if (label != null) {
        return <label>{label}</label>;
    }
    return null;
};

const renderIcon = (iconCss) => {
    if (iconCss != null) {
        return <i className={iconCss}></i>;
    }
    return null;
}

const UITextField = (props) => {
    return (
        <div className="field">
            {renderLabel(props.label)}
            <div className="ui input icon">
                <input type={props.type} name={props.name} placeholder={props.placeholder} defaultValue={props.defaultValue} readOnly={props.isReadOnly} />
                {renderIcon(props.iconCss)}
            </div>
        </div>
    );
};

export default UITextField;