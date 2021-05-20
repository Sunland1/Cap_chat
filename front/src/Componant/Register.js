import React from 'react'
import './css/login.css'
import {Link, withRouter} from "react-router-dom";
import {register} from '../api/connection'



class Register extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    _register(event){
        if(this.state.password.length >= 7){
            register(this.state.email,this.state.password).then( () => {
                this.props.history.push('/')
            })
        }else{
            alert("MDP trop court")
        }

        event.preventDefault()
    }

    render(){
        return(
            <div className="main">
                <div className="card">
                    <div className="card-body">
                        <h1>Register</h1>
                        <form onSubmit={(event) => {this._register(event)}}>
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
                            <button type="submit" className="btn btn-primary mr-5">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}




export default withRouter(Register)



