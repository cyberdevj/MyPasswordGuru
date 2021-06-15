import React from "react";
import faker from "faker";
import PasswordsItem from "./PasswordsItem";

class Passwords extends React.Component {
    render() {
        return (
            <div className="ui">
                <h3>Your Logins</h3>
                <div className="ui celled list">
                    <PasswordsItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/passwords/id" />
                    <PasswordsItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/passwords/id" />
                    <PasswordsItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/passwords/id" />
                    <PasswordsItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/passwords/id" />
                    <PasswordsItem accountImage={faker.image.image()} companyName={faker.company.companyName()} username={faker.internet.userName()} url="/passwords/id" />
                </div>
            </div>
        );
    }
}

export default Passwords;