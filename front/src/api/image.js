const url = 'http://localhost:8080/image'
export async function insertImageSing(token,image_sing,indice,id_jeux){
    let form = new FormData()
    form.append("file",image_sing)
    form.append("data" , JSON.stringify({
        indice: indice
    }))
    const res = fetch(url+"/singuliere/"+id_jeux+"/upload" , {
        method: "POST",
        headers: {
            "Accept": "appilcation/json",
            "authorization": token
        },
        body : form

    })

    return (await res).status
}



export async function insertImageNeutre(token,image_neutre,id_jeux){
    let form = new FormData()
    form.append("file",image_neutre)

    const res = fetch(url+"/neutre/upload/"+id_jeux , {
        method: "POST",
        headers: {
            "Accept": "appilcation/json",
            "authorization": token
        },
        body : form

    })


    return (await res).status
}