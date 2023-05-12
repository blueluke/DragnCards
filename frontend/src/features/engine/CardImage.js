import React from "react";
import { useVisibleFaceSrc } from "./functions/useVisibleFaceSrc";

export const CardImage = React.memo(({
    cardId,
}) => { 
    const visibleFaceSrc = useVisibleFaceSrc(cardId);
    return(
        <img className="absolute w-full h-full" style={{borderRadius: '0.6vh'}} src={visibleFaceSrc.src} onError={(e)=>{e.target.onerror = null; e.target.src=visibleFaceSrc.default}} />
    )
})