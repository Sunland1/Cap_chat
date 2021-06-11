const url = 'http://localhost:8080'

export async function getAllTheme(token){

    const res = fetch(url+"/theme/" , {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Accept": "appilcation/json",
            "authorization": token
        }
    })


    return (await res).json()

}


export async function getAllGameImage(token){
    const res = fetch(url+"/gameImage/" , {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Accept": "appilcation/json",
            "authorization": token
        }
    })

    return (await res).json()
}


export async function insertGameImage(token,id_theme,id_artiste,nom){
    const res = fetch(url+"/gameImage/" , {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "appilcation/json",
            "authorization": token
        },
        body : JSON.stringify({
            id_artiste: id_artiste,
            id_theme: id_theme,
            nom: nom
        })
    })

    return (await res).json()
}


export async function getAllArtiste(token){
    const res = fetch(url+"/artiste/" , {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Accept": "appilcation/json",
            "authorization": token
        }
    })

    return (await res).json()
}

export async function getAllGameImageTheme(id,token){
    const res = fetch(url+"/gameImage/"+id , {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Accept": "appilcation/json",
            "authorization": token
        }
    })

    return (await res).json()
}