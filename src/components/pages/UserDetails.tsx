import {AxiosUserCard} from "../axios/AxiosUserCard";
import React from "react";
import { useParams } from "react-router-dom";
import {MultiClientUserCard} from "../multi-client-context/MultiClientUserCard";
import {AxiosClientUserCard} from "../axios-client/AxiosClientUserCard";
import {ContextClientUserCard} from "../context-client/ContextClientUserCard";

export const UserDetails: React.FC = () => {
    const {id} = useParams<{id: string}>();
    return (
        <div>
            <MultiClientUserCard id={id}/>
        </div>
    );
}