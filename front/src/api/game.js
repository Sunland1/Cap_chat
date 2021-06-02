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