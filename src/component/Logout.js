import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";
import UISegmentWithProfilePicture from "./UISegmentWithProfilePicture";

const Logout = () => {
    return (
        <UISegmentWithProfilePicture src={faker.image.image()}>
            <div className="header">{faker.company.companyName()}</div>
            <div className="description">
                <Link className="ui fluid button" to="/">Logout</Link>
            </div>
        </UISegmentWithProfilePicture>
    );
};

export default Logout;