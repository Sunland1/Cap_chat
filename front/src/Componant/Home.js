import React from "react";
import {connect} from "react-redux";




class Home extends React.Component{
    constructor(props) {
        super(props)
    }


    render(){
        return(
            <p>{this.props.counter}</p>
        )
    }
}


const mapStateToProps = state => ({
    counter: state.counter
})


export default connect(mapStateToProps)(Home)


