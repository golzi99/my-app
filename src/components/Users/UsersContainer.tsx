import React from "react";
import {Users} from "./Users.tsx";

type PropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<PropsType> = ({pageTitle}) => {

    return (
        <>
            <h2>{pageTitle}</h2>
            <Users></Users>
        </>
    );
}