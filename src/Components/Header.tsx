import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { restartGame, startGame, toggleGameState } from '../Store/reducers/gameReducer/gameActions';
import '../Styles/header.scss';
import { Button } from './Buttons/Button';
import Counter from './Counters/Counter';

import start from '../start.svg';
import pause from '../pause.svg';

type HeaderProps = {

}



export const Header = (props:HeaderProps) => {
    const dispatch = useDispatch();


    //GET CURRENT GAME STATES
    const gameEnd = useSelector((state:RootStateOrAny) => state.game.gameEnd);
    const gameStatus = useSelector((state:RootStateOrAny) => state.game.gameState);
    const started = useSelector((state:RootStateOrAny) => state.game.started);

    //COUNTERS
    const rotating = useSelector((state:RootStateOrAny) => state.game.rotating);
    const speed = useSelector((state:RootStateOrAny) => state.game.speed);
    const leftWeight = useSelector((state:RootStateOrAny) => state.game.leftWeight);
    const rightWeight = useSelector((state:RootStateOrAny) => state.game.rightWeight);
    const totalPoints = useSelector((state:RootStateOrAny) => state.game.totalPoints);
    


    const gameStateToggle = () => {
        if(gameEnd){
            dispatch(restartGame({}))
            return
        }
        if(started){
            
            dispatch(toggleGameState({}));
            return;
        }
        dispatch(startGame({}));
    }


    return(
        <div className="header">
            <div className="logo">
                <h2>Teeter totter - React</h2>
            </div>

            <div className="control">
                <Button image={(!gameStatus?start:pause)} onClick={gameStateToggle} />
                
                <Counter label="Bending" value={`${rotating*2}%`} />
                <Counter label="Speed" value={`${speed}`}  />
                <Counter label="Left weight" value={`${leftWeight}`}  />
                <Counter label="Right weight" value={`${rightWeight}`}  />
                <Counter label="Points" value={`${totalPoints}`}  />
            </div>
        </div>
    )
}


