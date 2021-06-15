import React from "react";

const ListItem = (props) => {
    return (
        <div className="item">
            <div className="header">{props.title}</div>
            {props.content}
        </div>
    );
};

export default ListItem;