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
};

const UITextField = (props) => {
    return (
        <div className={`field ${props.className}`}>
            {renderLabel(props.label)}
            <div className="ui input icon">
                <input type={props.type} name={props.name} placeholder={props.placeholder} min={props.min} max={props.max} value={props.value} defaultValue={props.defaultValue} onChange={props.onChange} onBlur={props.onBlur} readOnly={props.isReadOnly} />
                {renderIcon(props.iconCss)}
            </div>
        </div>
    );
};

export default UITextField;