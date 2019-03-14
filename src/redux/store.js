import { createStore  } from 'redux'
import { Song } from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = createStore(Song,composeWithDevTools());

export default reducer;