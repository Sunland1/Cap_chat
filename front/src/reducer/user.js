const userReducer = (state={} , action) => {
    switch (action.type) {
        case "CREATE_USER" :
            return {...state,
                id_user: action.id_usr,
                token: action.token
            }
        case "DESTROY_USER" :
            return {}
        default :
            return state
    }
}

export default userReducer;