import { ADD_CATEGORY } from "../Constant";

const initialState = {
    name: [
        { "id": "Friends", "name": "Friends", "status": false },
        { "id": "Work", "name": "Work", "status": false },
        { "id": "Business", "name": "Business", "status": false },
    ]
}

export default function CategoryList_reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                name: [...state.name, { name: action.data, id: action.data, status: false }]
            }

        default:
            return state;
    }
}