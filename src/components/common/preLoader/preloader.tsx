import React from "react";
import nonProfileImg from "@assets/svg/loading.svg"


const Preloader = () => {
    return (<div>
        <img alt="Loading" src={nonProfileImg}/>
    </div>);
}

export default Preloader;