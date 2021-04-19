import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import '../../Styles/content.scss';
import { BaseFigure } from '../Figures/BaseFigure';
import { calcRotation, gameOver } from './../../Store/reducers/gameReducer/gameActions';

type TetterProps = {
    rotation: string | number;
}



export const Tetter = (props: TetterProps) => {

    const dispatch = useDispatch();
    const leftItems = useSelector((state:RootStateOrAny) => state.game.leftItems);
    const rightElements = useSelector((state:RootStateOrAny) => state.game.rightItems);

    const totalLeftForce = useSelector((state:RootStateOrAny) => state.game.totalLeftForce);
    const totalRightForce = useSelector((state:RootStateOrAny) => state.game.totalRightForce);


    useEffect(()=>{
        if(totalLeftForce > totalRightForce){
            const bending = (totalLeftForce - totalRightForce)/100
            dispatch(calcRotation({rotation:(bending*-1).toFixed()}))
            if(bending > 15){
                dispatch(gameOver({}))
                return
            }
            return
        } else if(totalLeftForce < totalRightForce){
            const bending = (totalRightForce - totalLeftForce)/100
            dispatch(calcRotation({rotation:bending.toFixed() }))
            if(bending > 15){
                dispatch(gameOver({}))
                return
            }
            return
        }
        
        dispatch(calcRotation({rotation: 0}));

    }, [totalLeftForce, totalRightForce]);


    return(
        <div className="tetter" style={{transform: `rotate(${props.rotation}deg)`}}>
            <div className="leftArea">
                {/* //map and show all left elements */}
                {
                    leftItems && leftItems.length > 0 ?
                        leftItems.map((elem:any) => {
                            return <BaseFigure key={elem.key} type={elem.type} color={elem.color} falling={elem.falling} left={elem.left} weight={elem.weight} />
                        })
                        :
                        <></>
                }
            </div>

            <div className="rightArea">
                {/* //map and show all right elements */}
                {
                    rightElements && rightElements.length >= 0 ?
                        rightElements.map((elem:any) => {
                            return <BaseFigure weight={elem.weight} key={elem.key} type={elem.type} color={elem.color} falling={false} right={elem.right} />
                        })
                        :
                        <></>
                }
            </div>
        </div>
    )
}


export default React.memo(Tetter);