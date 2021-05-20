import React from "react";
import "./css/login.css"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createUser, login} from '../action'
import {connection} from '../api/connection'


class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }


    _loggin(event){
        connection(this.state.email,this.state.password).then( (user) => {
            this.props.login()
            this.props.createUser(user.id_usr,user.token)
            this.props.history.push('/home')
        })
        event.preventDefault()

    }

    render() {
            return(
                <div className="main">
                    <div className="card">
                        <div className="card-body">
                            <h1>Login</h1>
                            <form onSubmit={(event) => {this._loggin(event)}}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control"
                                           onChange={(event) => {
                                               this.setState({email: event.target.value})
                                           }}/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Password</label>
                                    <input type="password" className="form-control"
                                           onChange={(event) => {
                                               this.setState({password: event.target.value})
                                           }}/>
                                </div>
                                <button type="submit" className="btn btn-primary mr-5">Submit</button>
                            </form>
                            <Link to='/register'>register</Link>
                        </div>
                    </div>
                </div>
            )


    }

}


const mapStateToProps = state => ({
    isLogged: state.isLogged,
    user: state.user
})

const mapDispatchToProps = () => {
    return {
        login,
        createUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(withRouter(Login))


