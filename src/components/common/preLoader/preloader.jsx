import React from "react";
import nonProfileImg from "@assets/svg/loading.svg"

function Preloader() {
    return (<div>
        <img alt="Loading" src={nonProfileImg}/>
    </div>);
}

export default Preloader;