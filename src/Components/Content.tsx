import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { restartGame, startGame, toggleGameState } from '../Store/reducers/gameReducer/gameActions';
import '../Styles/content.scss';
import { BaseFigure } from './Figures/BaseFigure';
import { Tetter } from './Tetter/Tetter';


type ContentProps = {

}



export const Content = (props:ContentProps) => {
    const dispatch = useDispatch();

    //GET CURRENT GAME STATE
    const gameEnd = useSelector((state:RootStateOrAny) => state.game.gameEnd);
    const gameStatus = useSelector((state:RootStateOrAny) => state.game.gameState);
    const started = useSelector((state:RootStateOrAny) => state.game.started);


    const rotating = useSelector((state:RootStateOrAny) => state.game.rotating);
    const fallingItems = useSelector((state:RootStateOrAny) => state.game.fallingItems);

    const changeState = (event:any) => {
        var keyPr = event.code;

        if(gameEnd){
            return
        }

        
        if(keyPr === "Space"){
            //if game is already started do pause/continue, else start the game
            if(started){
                dispatch(toggleGameState({}));
                return;
            }
            dispatch(startGame({}));
        }
    }

    //listen for space key to pause/start the game
    useEffect(() => {
        window.addEventListener('keydown', changeState);

        return () => {
            window.removeEventListener('keydown', changeState);
        };

        
    }, [changeState]);

    

    return(
        <div className="content">
            {
                started ?
                    <div className={`pausedModal ${(gameStatus && !gameEnd ? '' : 'paused')}`}>
                        {
                            !gameEnd?
                                <>
                                    <h1>PAUSE</h1>
                                    <h3>(Press space to continue)</h3>
                                </>
                                :
                                <>
                                    <h1>Game Over</h1>
                                    <button className={"restartButton"} onClick={()=>{
                                        dispatch(restartGame({}))
                                    }}>Restart</button>
                                </>
                        }
                    </div>
                    :
                    <></>
            }


            <div className="gameArea">
                
                {/* Falling elements part */}
                {
                    fallingItems !== undefined && fallingItems.length > 0 ?
                        fallingItems.map((item:any)=>{
                            return <BaseFigure key={item.key} falling={true} rotation={rotating} />
                        })
                        :
                        <></>
                }


                <Tetter rotation={rotating} />

                {/* bottom of teeter */}
                <div className="bottomTriangle"></div>
            </div>
            

        </div>
    )
}