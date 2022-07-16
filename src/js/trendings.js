import { getTrending, IMG_BASE_URL, IMG_W400 } from './api';
import { renderMarkup } from './renderMarkup';

import { list } from './refs';

getTrending(1).then(r => renderMarkup(r));
