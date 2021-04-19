import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/figure.scss'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addPoints, fallingEnd, newFallingItem, newRightItem } from '../../Store/reducers/gameReducer/gameActions';

type BaseFigureProps = {
    falling: boolean;
    rotation?: number;
    left?: number;
    weight?: string;
    right?: any;
    color?: string;
    type?: string;
}

const types = [
    'circle',
    'rectangle',
    'triangle'
]



export const BaseFigure = (props:BaseFigureProps) => {

    const dispatch = useDispatch();
    const gameEnd = useSelector((state:RootStateOrAny) => state.game.gameEnd);
    const gameStatus = useSelector((state:RootStateOrAny) => state.game.gameState);
    const [right, setRight] = useState<boolean>(props.right !== void 0 ? props.right : false);
    const [weight, setWeight] = useState(props.weight !== undefined ? props.weight : (Math.random() * (10 - 1) + 1).toFixed());
    const [top, setTop] = useState(120);
    const [left, setLeft] = useState(props.left !== void 0 ? props.left : 0);

    const [type, setType] = useState(props.type ? props.type : types[Math.floor(Math.random() * types.length)]);


    const [falling, setFalling] = useState<boolean>(!props.falling ? props.falling : true);
    const [height, setHeight] = useState((30+(parseInt(weight)*5)));
    const [width, setWidth] = useState((30+(parseInt(weight)*5)));
    const [color, setColor] = useState(props.color ? props.color : `#${Math.floor(Math.random()*16777215).toString(16)}`);
    const [textColor, setTextColor] = useState('black');


    


    

    
    const moveFigure = (event:any) => {
        

        if(!falling){
            return
        }

        var keyPr = event.code;


        
        if(keyPr === "ArrowLeft"){ 
            if(left <= 0){
                return;
            }
            window.requestAnimationFrame(()=>{
                setLeft(left - 30);
            });
            
        }
        else if(keyPr === "ArrowRight"){
            if(left >= (450-width)){
                return;
            }
            window.requestAnimationFrame(()=>{
                setLeft(left + 30);
            });
        }
    }

    const collisionDetected = () => {
        let tetter = document.querySelector(".tetter");
        let detector = document.querySelector(".tetterDetector");

        let mainTetterY = tetter ? tetter?.getBoundingClientRect().y : 0;
        let tetterDetectorY = detector ? detector?.getBoundingClientRect().y : 0;
        

        if((Math.trunc(mainTetterY)) <= (Math.trunc(tetterDetectorY))){
            endFalling();
        }
    }

    const startFalling = () => {
        if(falling){
            setTop(top + 0.4);
        }
    }

    const endFalling = () => {
        setFalling(false);

        //ADDING POINTS
        dispatch(addPoints({points: parseInt(weight)/2}));

        //INSERTING LEFT ELEMENT TO MAIN TEETER
        dispatch(fallingEnd({
            falling: false,
            left: left,
            weight: weight,
            color: color,
            type: type,
            key: Date.now(),
            force: ((500-width-left)*parseInt(weight))
        }));


        //GENERATING RANDOM VALUES FOR RIGHT FIGURE
        const randomRight = (Math.random() * (400 - 1) + 1).toFixed();
        const randomWeight = (Math.random() * (10 - 1) + 1).toFixed();

        //NEW RANDOM RIGHT ITEM
        dispatch(newRightItem({
            falling: false,
            weight: randomWeight,
            type: types[Math.floor(Math.random() * types.length)],
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            key: Date.now(),
            right: randomRight,
            force: ((500-(30+(parseInt(randomWeight)*5))-parseInt(randomRight))*parseInt(randomWeight))
        }))

        //NEW FALLING ITEM
        setTimeout(()=>{
            dispatch(newFallingItem({}));
        }, 1000);
    }



    useEffect(() => {
        if(falling && gameStatus && !gameEnd){
            window.addEventListener('keydown', moveFigure);

            return () => {
                window.removeEventListener('keydown', moveFigure);
            };
        }
    }, [moveFigure]);



    useEffect(()=>{
        
        if(falling && gameStatus && !gameEnd){
            startFalling();
            collisionDetected()
        }
        

    });


    //GET CURRENT FIGURE STYLES BASED ON TYPE
    const typeStyle = () => {
        switch(type) {
            case "triangle":
                return {
                    borderLeft: `${width}px solid transparent`,
                    borderRight: `${width}px solid transparent`,
                    borderBottom: `${width}px solid ${color}`
                }
            case "circle":
                return {
                    borderRadius: '50%',
                    backgroundColor: color,
                    height: `${height}px`,
                    width: `${width}px`,
                }
            case "rectangle":
                return {
                    backgroundColor: color,
                    height: `${height}px`,
                    width: `${width}px`,
                }
            default:
                return{
                    backgroundColor: color,
                    height: `${height}px`,
                    width: `${width}px`
                }
        }
    }


    return(
        <>

            {
                //CHECK IF THIS FIGURE IS ON RIGHT SIDE
                right ? 
                    <div className="figure" style={{
                        ...typeStyle(),
                        top: `-${height}px`,
                        right: `${right}px`}}
                    >
                        <h1 style={{margin: 0, padding: 0, color: textColor, fontSize: `${height/2}px`, position: 'absolute', ...(type === 'triangle'? {top: `${width/4}px`} : {})}}>{weight}</h1>
                    </div>
                    :
                    falling ?
                        <div className="tetterDetector" style={{transform: `rotate(${props.rotation}deg)`, top: `${top}px`}}>
                            <div className="figure" style={{
                                ...typeStyle(),
                                top: `-${height}px`,
                                left: `${left}px`
                            }}>
                                <h1 style={{
                                    margin: 0,
                                    padding: 0,
                                    color: textColor,
                                    fontSize: `${height/2}px`,
                                    position: 'absolute',
                                    ...(type === 'triangle'? {top: `${width/4}px`} : {})}}>
                                        {weight}
                                    </h1>
                            </div>
                        </div>
                        :
                        <div className="figure" style={{...typeStyle(), top: `-${height}px`, left: `${left}px`}}>
                            <h1 style={{margin: 0, padding: 0, color: textColor, fontSize: `${height/2}px`, position: 'absolute', ...(type === 'triangle'? {top: `${width/4}px`} : {})}}>{weight}</h1>
                        </div>
            }

        </>
    )
}
