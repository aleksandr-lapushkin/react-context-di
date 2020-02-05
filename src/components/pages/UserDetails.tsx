import {AxiosUserCard} from "../axios/AxiosUserCard";
import React from "react";
import { useParams } from "react-router-dom";
import {MultiClientUserCard} from "../multi-client-context/MultiClientUserCard";

export const UserDetails: React.FC = () => {
    const {id} = useParams<{id: string}>();
    return (
        <div>
            <MultiClientUserCard id={id}/>
        </div>
    );
}