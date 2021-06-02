import React from "react";
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import Register from "./Register";
import GenerateCapChat from "./GenerateCapChat";


class Navigation extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Router>
                <Route path="/" render={() => (<Nav/>)}/>
                <Route path="/" exact render={() => (<Login/>)}/>
                <Route path="/register" exact render={() => (<Register/>)}/>
                <Route path="/home" exact render={() => (<Home/>)}/>
                <Route path="/generate" exact render={() => (<GenerateCapChat/>)}/>
            </Router>
        )
    }


}



export default Navigation