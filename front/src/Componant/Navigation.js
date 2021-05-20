import React from "react";
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import Register from "./Register";


class Navigation extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Router>
                <Route path="/" exact render={() => (<Login/>)}/>
                <Route path="/register" exact render={() => (<Register/>)}/>
                <Route path="/home" exact render={() => (
                    <>
                        <Nav/>
                        <Home/>
                    </>
                )}/>
            </Router>
        )
    }


}



export default Navigation