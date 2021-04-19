import { combineReducers } from 'redux';


import gameReducer from './reducers/gameReducer/gameReducer';


export const rootReducer = combineReducers({

    game: gameReducer

});

// export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>