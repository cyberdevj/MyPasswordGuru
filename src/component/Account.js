import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";
import Logout from "./Logout";
import AccountPersonal from "./AccountPersonal";
import AccountInterest from "./AccountInterest";

class Account extends React.Component {
    state = { fullname: "" };

    componentDidMount() {
        const fullname = faker.name.firstName() + " " + faker.name.lastName();
        this.setState({ fullname: fullname })
    }

    render() {
        return (
            <form className="ui form">
                <div className="ui tiny">
                    You can provide additional information to Guru to improve your password suggestions. You are in control of your data, and you can swipe any item to the left to delete it.
                    <br />
                    <br />
                    This data is stored on your device and is never sent to a server.
                </div>

                <Logout />

                <AccountPersonal fullname={this.state.fullname} region={faker.address.country()} language="English, Chinese, Japanese" age={Math.floor(Math.random() * 82) + 18} company={faker.company.companyName()} />
                <AccountInterest />

                <Link className="fluid ui button" to="/account/personalize">Personalize</Link>
            </form>
        );
    }
}

export default Account;