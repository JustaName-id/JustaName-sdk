import React from 'react';


import RiveComponent from '@rive-app/react-canvas';

export const RiveAnimations = ({imageId}) => {
    return (
        <div style={{width: "100%", aspectRatio: 16/9,  margin: "0 auto"}}>
            <RiveComponent src={ `https://public.rive.app/hosted/328119/${imageId}.riv`}
            artboard={"New Artboard"}
                           stateMachines={["State Machine 1"]}
            autoplay={true}
                           shouldResizeCanvasToContainer={true}
            />

        </div>
    );
}

export default RiveAnimations;