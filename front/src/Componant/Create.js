import React from 'react'
import './css/generateCapChat.css'
import {getAllArtiste, getAllTheme,insertGameImage} from "../api/game";
import {insertImageSing,insertImageNeutre} from "../api/image";
import {connect} from "react-redux";


class Create extends React.Component{


    constructor(props) {
        super(props);
        this.user = this.props.user
        this.state = {
            themeData: [],
            artisteData: [],
            id_theme : null,
            id_artiste: null,
            id_jeux: null,
            name_capchat : "",
            indice: "",
            image_neutre: null,
            image_sing: null
        }
    }


    componentDidMount() {
        getAllTheme(this.user.token).then( (data) => {
            this.setState({themeData: data})
        })

        getAllArtiste(this.user.token).then( (data) => {
            this.setState({artisteData: data})
        })
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

    _optionArtisteGen(){

        let data = this.state.artisteData
        let option = []

        for(let i=0;i<data.length;i++){
            option.push(
                <option value={data[i].id_artiste}>{data[i].nom}</option>
            )
        }

        return option
    }


    _handleChangeSelect(event,typeOfSelect){
        switch (typeOfSelect){
            case "theme" :
                this.setState({id_theme: event.target.value})
                break
            case "artiste" :
                this.setState({id_artiste: event.target.value})
                break
            case "capchat_name" :
                this.setState({name_capchat: event.target.value})
                break
            case "indice" :
                this.setState({indice: event.target.value})
                break
            case "sing" :
                this.setState({image_sing: event.target.files[0]})
                break
            case "neutre" :
                this.setState({image_neutre: event.target.files[0]})
                break
        }
    }

    _createCapChat(){
        insertGameImage(this.user.token,this.state.id_theme,this.state.id_artiste,this.state.name_capchat).then((data) => {
            this.setState({id_jeux: data.id_jeux})
        })
    }


    _insertImage(){
        insertImageSing(this.user.token,this.state.image_sing,this.state.indice,this.state.id_jeux).then((res) => {
            if(res === 200) insertImageNeutre(this.user.token,this.state.image_neutre,this.state.id_jeux).then((res) => {
                if(res === 200) alert("UPLOAD DONE")
            })
        })
    }


    render() {
        console.log(this.state)
        return(
            <div className="main1">
                <h1>Creation du CapChat</h1>
                <select style={{width: "25%"}} className="form-control"
                        onChange={(event) => this._handleChangeSelect(event,"theme")}>
                    <option value="all">Selectione un Theme</option>
                    {this._optionThemeGen()}
                </select>

                <select style={{width: "25%"}} className="form-control mt-2"
                        onChange={(event) => this._handleChangeSelect(event,"artiste")}>
                    <option value="all">Selectione un artiste</option>
                    {this._optionArtisteGen()}
                </select>

                <div style={{width: "55%"}}>
                    <label className="form-label">Nom du CapChat</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">Nom</span>
                        <input onChange={(event) => this._handleChangeSelect(event,"capchat_name")} type="text" className="form-control" placeholder="Nom du CapChat" aria-describedby="basic-addon3"/>
                        <button onClick={() => {this._createCapChat()}} className="btn btn-primary">Create</button>
                    </div>

                    <label className="form-label">Image Singulière</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">JPG</span>
                        <input onChange={(event) => {this._handleChangeSelect(event,"sing")}} type="file" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                        <input onChange={(event) => {this._handleChangeSelect(event,"indice")}} type="text" className="form-control" placeholder="Ecrit l'indice" aria-describedby="basic-addon3"/>
                    </div>


                    <label className="form-label">Image Neutre</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">ZIP</span>
                        <input onChange={(event) => {this._handleChangeSelect(event,"neutre")}} type="file" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                    </div>

                    <button onClick={() => {this._insertImage()}} className="btn btn-primary">Upload</button>
                </div>


            </div>
        )
    }


}




const mapStateToProps = state => ({
    user: state.user,
})




export default connect(mapStateToProps)(Create)



