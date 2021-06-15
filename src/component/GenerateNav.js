import React from "react";
import { Link, useLocation } from "react-router-dom";

const GenerateNav = (props) => {
    const location = useLocation().pathname;
    let basicClass = (location.includes("basic")) ? "item active" : "item";
    let enhancedClass = (location.includes("enhanced")) ? "item active" : "item";
    let customClass = (location.includes("custom")) ? "item active" : "item";
    
    return (
        <div className="ui container">
            <div className="ui three item stackable tabs menu">
                <Link className={basicClass} to="/generate/basic">Basic</Link>
                <Link className={enhancedClass} to="/generate/enhanced">Enhanced</Link>
                <Link className={customClass} to="/generate/custom">Custom</Link>
            </div>
            {props.children}
        </div>
    );
};

export default GenerateNav;