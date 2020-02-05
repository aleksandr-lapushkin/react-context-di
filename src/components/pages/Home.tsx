import {AxiosUsersList} from "../axios/AxiosUsersList";
import React from "react";
import {AxiosClientUsersList} from "../axios-client/AxiosClientUsersList";
import {ContextClientUsersList} from "../context-client/ContextClientUsersList";
import {MultiClientUsersList} from "../multi-client-context/MultiClientUsersList";

export const Home: React.FC = () => {
    return (
        <div>
            <MultiClientUsersList/>
        </div>
    );
}