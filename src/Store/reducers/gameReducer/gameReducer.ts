import { BaseFigure } from '../../../Components/Figures/BaseFigure';
import {
    TOGGLE_GAME_STATE,
    RESTART_GAME,
    GAME_OVER,
    CALC_ROTATION,
    ADD_POINTS,
    NEW_FALLING_ITEM,
    NEW_RIGHT_ITEM,
    FALLING_END,
    START_GAME,
    ADD_LEFT,
    ADD_RIGHT
} from './gameTypes';




const INITIAL_STATE = {
    gameState: false,
    started: false,
    rotating: 11,
    speed: 1,
    leftWeight: 0,
    rightWeight: 0,
    totalPoints: 0,
    leftItems: <any>[],
    rightItems: <any>[],
    falingItems: <any>[],
    totalLeftForce: 0,
    totalRightForce: 0,
    gameEnd: false
};


type reducerType = {
    type: string;
    payload: any;
}


const gameReducer = (state = INITIAL_STATE, action:reducerType) => {

    switch (action.type) {
        case TOGGLE_GAME_STATE:
            return {

                ...state,
                gameState: !state.gameState,
                started: true
            };
        case RESTART_GAME:
            return {

                ...state,
                gameState: !state.gameState,
                leftWeight: 0,
                rightWeight: 0,
                totalPoints: 0,
                totalLeftForce: 0,
                totalRightForce: 0,
                leftItems: <any>[],
                rightItems: <any>[],
                gameEnd: false,
                rotating: 0

            };
        case START_GAME:
            return {

                ...state,
                gameState: !state.gameState,
                started: true,
                fallingItems: [...state.falingItems, {key: Date.now()}]

            };
        case GAME_OVER:
            return {

                ...state,
                gameEnd: true,
                gameState: !state.gameState

            };
        case FALLING_END:
            return {

                ...state,
                leftItems: [...state.leftItems, action.payload],
                leftWeight: state.leftWeight + parseInt(action.payload.weight),
                totalLeftForce: state.totalLeftForce + parseInt(action.payload.force)
            };
        case NEW_RIGHT_ITEM:
            return {

                ...state,
                rightItems: [...state.rightItems, action.payload],
                rightWeight: state.rightWeight + parseInt(action.payload.weight),
                totalRightForce: state.totalRightForce + parseInt(action.payload.force)

            };
        case NEW_FALLING_ITEM:
            return {

                ...state,
                fallingItems: [...state.falingItems, {key: Date.now()}]

            };
        case ADD_POINTS:
            return {

                ...state,
                totalPoints: state.totalPoints + action.payload.points

            };
        case ADD_LEFT:
            return {

                ...state,
                leftWeight: state.leftWeight + action.payload.weight

            };
        case ADD_RIGHT:
            return {

                ...state,
                rightWeight: state.rightWeight + action.payload.weight

            };
        case CALC_ROTATION:
            return {
                ...state,
                rotating: action.payload.rotation
            }

        default: return state;

    }

};

export default gameReducer;