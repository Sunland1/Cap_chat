import React from "react";
import './css/nav.css'

import {logOut} from "../action";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";


class Nav extends React.Component{

    constructor(props){
        super(props)
    }


    _logout(){
        this.props.logOut()
        this.props.history.push('/')
    }

    _loginNav(){
        if(this.props.isLogged){
            return(
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/generate'}>Generate Cap'Chat</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/create'}>Create Cap'chat</Link>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link active" onClick={() => {this._logout()}}>Logout</a>
                    </li>
                </>
            )
        }else{
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/'}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/register'}>Register</Link>
                    </li>
                </>
            )
        }
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/home'}>Cap'Chat</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation"/>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to={'/home'}>Acceuil</Link>
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

const mapDispatcherToProps = () => {
    return {
        logOut
    }
}



export default connect(mapStateToProps,mapDispatcherToProps())(withRouter(Nav))