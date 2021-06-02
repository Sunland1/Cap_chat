import React from "react";
import {connect} from "react-redux";
import './css/login.css'




class Home extends React.Component{
    constructor(props) {
        super(props)
    }


    render(){
        return(
            <div className="main">
                <h1>Bienvenue sur Cap'Chat !</h1>
                <p>Ce cite a pour but de crée des cap'chat personnaliser</p>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    counter: state.counter
})


export default connect(mapStateToProps)(Home)


