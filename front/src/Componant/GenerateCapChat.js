import React from 'react'
import './css/generateCapChat.css'
import {getAllGameImage, getAllGameImageTheme, getAllTheme} from "../api/game";
import {connect} from "react-redux";


class GenerateCapChat extends React.Component{



    constructor(props) {
        super(props);
        this.user = this.props.user
        this.state = {
            dataGameImage: [],
            themeData: []
        }
    }


    componentDidMount() {
        getAllTheme(this.user.token).then( (data) => {
            this.setState({themeData: data})
        })
        getAllGameImage(this.user.token).then((data) => {
            console.log(data)
            this.setState({dataGameImage: data})
        })
    }


    _handleChangeTheme(event){
        if(event.target.value === "all"){
            getAllGameImage(this.user.token).then((data) => {
                this.setState({dataGameImage: data})
            })
        }else{
            getAllGameImageTheme(event.target.value,this.user.token).then((data) => {
                this.setState({dataGameImage: data})
            })
        }
    }

    _columGen(data){
        let col = []
        for(const property in data){
            col.push(
                <td scope="row">{data[property]}</td>
            )
        }
        return col
    }

    _rowGen(){
        let ligne = []
        let data = this.state.dataGameImage

        for(let i=0;i<data.length;i++){
            ligne.push(
                <tr>
                    {this._columGen(data[i])}
                </tr>
            )
        }
        return ligne
    }


    _optionThemeGen(){
        let data = this.state.themeData
        let option = []

        for(let i=0;i<data.length;i++){
            option.push(
                <option value={data[i].id_theme}>{data[i].nom}</option>
            )
        }

        return option
    }



    render(){
        return(
            <div className="main1">
                <h1>Selectionner un themes</h1>
                <select style={{width: "25%"}} className="form-control"
                        onChange={(event) => this._handleChangeTheme(event)}>
                    <option value="all">Selectione un Theme</option>
                    {this._optionThemeGen()}
                </select>
                <table className="table table-success table-striped mt-5">
                    <thead>
                    <tr>
                        <th scope="col">id_artiste</th>
                        <th scope="col">id_jeux</th>
                        <th scope="col">id_theme</th>
                        <th scope="col">Nom</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this._rowGen()}
                    </tbody>
                </table>
            </div>
        )
    }


}


const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(GenerateCapChat)