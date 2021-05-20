import React from "react";
import './css/nav.css'

import {connect} from "react-redux";
import {increment} from "../action";


class Nav extends React.Component{

    constructor(props){
        super(props)
    }

    _loginNav(){
        if(this.props.isLogged){
            return(
                <>
                    <li className="nav-item">
                        <a className="nav-link active" href="/login">Youpi1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/login">Youpi2</a>
                    </li>
                </>
            )
        }
    }

    render(){
        console.log(this.props.user)
        return(
            <nav className="navbar navbar-expand-lg navbar-light dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Cap'Chat</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation"/>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Acceuil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/login">Login</a>
                            </li>
                            {this._loginNav()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.isLogged,
    user: state.user
})



export default connect(mapStateToProps)(Nav)