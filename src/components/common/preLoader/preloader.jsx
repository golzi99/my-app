import React from "react";

function Preloader(props) {
    return (<div>
        <img alt="Loading" src={`${process.env.PUBLIC_URL}/svg/loading.svg`}/>
    </div>);
}

export default Preloader;