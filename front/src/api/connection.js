const url = "http://localhost:8080/users"

export async function connection(email,password){
    const res = fetch(url+"/login" , {
        method: "POST",
        headers: {
            'Accept' : "application/json",
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    return (await res).json()
}


export async function register(email,password){
    const res = fetch(url+"/register" , {
        method: "POST",
        headers: {
            'Accept' : "application/json",
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    return (await res).json()
}