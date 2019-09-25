import axios from 'axios';

import {
    GET_BGIMG
} from '../constants';

console.log('working-here')

export const getbackgroundImage = () => dispatch => {
    console.log('working-api');
    axios.get('http://localhost:5000/api/photos')
        .then(res => dispatch({
            type: GET_BGIMG,
            payload: res.data.urls.full
        }))
        .catch(err => console.log(err));
}
