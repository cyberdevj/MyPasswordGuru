import React from "react";

const AccountPersonal = (props) => {
    return (
        <div className="ui segment">
            <h2 className="ui header">
                <div className="content">Personal Information</div>
            </h2>
            <div className="field">
                <label>Full Name</label>
                <input type="text" name="fullname" placeholder="Full Name" defaultValue={props.fullname} />
            </div>
            <div className="field">
                <label>Region</label>
                <input type="text" name="region" placeholder="Region" defaultValue={props.region} />
            </div>
            <div className="field">
                <label>Languages</label>
                <input type="text" name="region" placeholder="Region" defaultValue={props.language} />
            </div>
            <div className="field">
                <label>Age</label>
                <input type="text" name="age" placeholder="Age" defaultValue={props.age} />
            </div>
            <div className="field">
                <label>Company</label>
                <input type="text" name="company" placeholder="Company" defaultValue={props.company} />
            </div>
        </div>
    );
};

export default AccountPersonal;