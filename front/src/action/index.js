export const increment = () => {
    return {
        type: "INCREMENT"
    }
}

export const login = () => {
    return {
        type: "SIGN_IN"
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}



export const createUser = (id_usr,token) => {
    return {
        type: "CREATE_USER",
        id_usr: id_usr,
        token: token
    }
}