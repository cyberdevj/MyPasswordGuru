import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";

const Logout = () => {
    return (
        <div className="ui segment">
            <div className="ui items">
                <div className="item">
                    <div className="ui tiny image">
                        <img alt="ProfilePicture" src={faker.image.avatar()} />
                    </div>
                    <div className="content">
                        <div className="header">{faker.name.firstName()}</div>
                        <div className="description">
                            <Link className="ui fluid button" to="/">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;