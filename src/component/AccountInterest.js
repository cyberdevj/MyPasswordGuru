import React from "react";
import ListItem from "./ListItem";

const AccountInterest = () => {
    return (
        <div className="ui segment">
            <h2 className="ui header">
                <div className="content">Interest</div>
            </h2>

            <div className="ui celled list">
                <ListItem title="Linux" content="Computer" />
                <ListItem title="Apple" content="Computer" />
                <ListItem title="Dog" content="Animal" />
                <ListItem title="Cat" content="Animal" />
                <ListItem title="Hamster" content="Animal" />
                <ListItem title="Ferrari" content="Car" />
                <ListItem title="Posche" content="Car" />
                <ListItem title="Posche" content="Car" />
                <ListItem title="Giordano" content="Fashion" />
                <ListItem title="Adidas" content="Fashion" />
                <ListItem title="Nike" content="Fashion" />
            </div>
        </div>
    );
};

export default AccountInterest;