import React from 'react';


type CounterProps = {
    label: string;
    value: string | number;
}


export const Counter = (props: CounterProps) => {
    


    return(
        <div className="counter">
            <span className="label">{props.label}</span>
            <span className="value">{props.value}</span>
        </div>
    )
}


export default Counter;