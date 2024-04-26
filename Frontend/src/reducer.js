// reducers.js
import { SET_EMPLOYMENT_STATUS } from "./actions";

const initialState = {
    isEmp: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYMENT_STATUS:
            return {
                ...state,
                isEmp: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;