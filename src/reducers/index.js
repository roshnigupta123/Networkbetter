let defaultState = {
    contacts:[],
}

const mainReducers = (state = defaultState, action) => {
    if (action.type === "CONTACTS") {
        return {
            ...state,
            contacts : action.contacts
        }
    } else {
        return {
            ...state
        }
    }

}

export default mainReducers;