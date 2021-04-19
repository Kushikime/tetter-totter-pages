import React, { useState } from 'react';
import '../../Styles/header.scss';

type ButtonProps = {
    label?: string;
    image?: any;
    onClick?: ({}:any)=> void;
}


export const Button = (props:ButtonProps) => {




    return(
        <div className="button" onClick={props.onClick}>
            {
                props.image ?
                    <img style={{height:'50px', width: '50px'}} src={props.image} />
                :
                    <span className="label">{props.label}</span>
            }
        </div>
    )
}