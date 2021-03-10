
import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://react-burger-80831-default-rtdb.firebaseio.com/'
})
export default instance;