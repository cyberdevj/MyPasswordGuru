// Import the React and ReactDOM libraries
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ReactDOM from 'react-dom';
import Nav from './component/Nav';
import GenerateNav from './component/GenerateNav';
import Login from './component/Login';
import LoginAccountEdit from './component/LoginAccountEdit';
import LoginAccountView from './component/LoginAccountView';
import LoginAccountList from './component/LoginAccountList';
import GenerateBasic from './component/GenerateBasic';
import GenerateEnhanced from './component/GenerateEnhanced';
import GenerateCustom from './component/GenerateCustom';
import Account from './component/Account';
import Personalize from './component/Personalize';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login/new">
                    <Nav>
                        <LoginAccountEdit />
                    </Nav>
                </Route>
                <Route path="/login/edit">
                    <Nav>
                        <LoginAccountEdit />
                    </Nav>
                </Route>
                <Route path="/login/view">
                    <Nav>
                        <LoginAccountView />
                    </Nav>
                </Route>
                <Route path="/login/list">
                    <Nav>
                        <LoginAccountList />
                    </Nav>
                </Route>
                <Route path="/generate/basic">
                    <Nav>
                        <GenerateNav>
                            <GenerateBasic />
                        </GenerateNav>
                    </Nav>
                </Route>
                <Route path="/generate/enhanced">
                    <Nav>
                        <GenerateNav>
                            <GenerateEnhanced />
                        </GenerateNav>
                    </Nav>
                </Route>
                <Route path="/generate/custom">
                    <Nav>
                        <GenerateNav>
                            <GenerateCustom />
                        </GenerateNav>
                    </Nav>
                </Route>
                <Route path="/account/personalize">
                    <Nav>
                        <Personalize />
                    </Nav>
                </Route>
                <Route path="/account">
                    <Nav>
                        <Account />
                    </Nav>
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
            <br />
        </Router>
    );
}

// Take the React component and show it on the screen
ReactDOM.render(
    <App />,
    document.querySelector("#root")
);
