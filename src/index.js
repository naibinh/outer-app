import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import "./styles/index.css";
import AdApp from './components/AD/App';
import KdApp from './components/KD/App';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={AdApp}/>
                <Route exact path="/ad" component={AdApp}/>
                <Route exact path="/kd" component={KdApp}/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <AppRouter/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
