import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools}  from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../reducer";




export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
                                         // funcion combinadora para mezclar las DevTool con los middleware/applyMiddleware--> para utilizar las acciones de tipo asincrono
