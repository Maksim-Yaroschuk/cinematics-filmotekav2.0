//import api from './js/api';
import { getTrending } from './js/api';

getTrending(3).then(r => console.log(r));