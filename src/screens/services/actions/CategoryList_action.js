import { ADD_CATEGORY } from '../Constant';

export const categoryList = (data) => {
    console.log("action", data)
    return {
        type: ADD_CATEGORY,
        data: data
    }
}