import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";
import LoginAccountItem from "./LoginAccountItem";

class LoginAccountList extends React.Component {
    render() {
        return (
            <div className="ui">
                <h3>Your Login Account List</h3>
                <Link className="ui button" to="/login/new">Add</Link>
                <div className="ui celled list">
                    <LoginAccountItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/login/view" />
                    <LoginAccountItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/login/view" />
                    <LoginAccountItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/login/view" />
                    <LoginAccountItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/login/view" />
                    <LoginAccountItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/login/view" />
                </div>
            </div>
        );
    }
}

export default LoginAccountList;