import {
    TOGGLE_GAME_STATE,
    TOGGLE_GAME_AUTOPLAY,
    RESTART_GAME,
    GAME_OVER,
    CALC_ROTATION,
    ADD_POINTS,
    NEW_FALLING_ITEM,
    NEW_RIGHT_ITEM,
    FALLING_END,
    NEW_FALLING_AUTOPLAY,
    INCREASE_SPEED,
    START_GAME,
    ADD_RIGHT,
    ADD_LEFT
} from './gameTypes';


export const toggleGameState = (payload: any) => {

    return {

        type: TOGGLE_GAME_STATE,
        payload

    };

};

export const startGame = (payload: any) => {

    return {

        type: START_GAME,
        payload

    };

};




export const toggleGameAutoplay = (payload: any) => {

    return {

        type: TOGGLE_GAME_AUTOPLAY,
        payload

    };

};

export const restartGame = (payload: any) => {

    return {

        type: RESTART_GAME,
        payload

    };

};


export const gameOver = (payload: any) => {

    return {

        type: GAME_OVER,
        payload

    };

};


export const increaseSpeed = (payload: any) => {

    return {

        type: INCREASE_SPEED,
        payload

    };

};


export const calcRotation = (payload: any) => {

    return {

        type: CALC_ROTATION,
        payload

    };

};    


export const addPoints = (payload: any) => {

    return {

        type: ADD_POINTS,
        payload

    };

};

export const addLeft = (payload: any) => {

    return {

        type: ADD_LEFT,
        payload

    };

};

export const addRight = (payload: any) => {

    return {

        type: ADD_RIGHT,
        payload

    };

};


export const newFallingItem = (payload: any) => {

    return {

        type: NEW_FALLING_ITEM,
        payload

    };

};


export const newRightItem = (payload: any) => {

    return {

        type: NEW_RIGHT_ITEM,
        payload

    };

};


export const fallingEnd = (payload: any) => {

    return {

        type: FALLING_END,
        payload

    };

};

export const newFallingItemAuto = (payload: any) => {

    return {

        type: NEW_FALLING_AUTOPLAY,
        payload

    };

};
