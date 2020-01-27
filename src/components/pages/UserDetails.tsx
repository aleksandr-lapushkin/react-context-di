import {AxiosUserCard} from "../axios/AxiosUserCard";
import React from "react";
import { useParams } from "react-router-dom";

export const UserDetails: React.FC = () => {
    const {id} = useParams<{id: string}>();
    return (
        <div>
            <AxiosUserCard id={id}/>
        </div>
    );
}