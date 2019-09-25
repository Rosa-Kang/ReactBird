import { GET_BGIMG } from '../constants';

const initialState = {
    bgsource : null
};

export default ( state = initialState, action) => {
    switch (action.type) {  
        case GET_BGIMG :
            return {
                ...state,
                bgsource: action.payload
            }
        default:
            return state
    }
}
