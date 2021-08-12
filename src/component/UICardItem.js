import React from "react";
import { Card } from "semantic-ui-react";

const UICardItem = (props) => {
    return (
        <Card onClick={props.onClick}>
            <Card.Content>
                {props.close ? <div className="right floated icon cursor-pointer" onClick={props.closeOnClick}><i className="close icon"></i></div> : null}
                <Card.Header>{props.title}</Card.Header>
                <Card.Meta>{props.meta}</Card.Meta>
            </Card.Content>
        </Card>
    )
};

export default UICardItem;