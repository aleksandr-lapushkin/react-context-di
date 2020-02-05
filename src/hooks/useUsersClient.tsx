import {AxiosUserClient, UserClient} from "../clients/UserClient";
import axios from "axios";
import React from "react";

interface UsersClientContextValue {
    client: UserClient
}

export const UsersClientContext = React.createContext<UsersClientContextValue>({client: new AxiosUserClient(axios.create())})

export function useUsersClient(): UserClient {
    return React.useContext(UsersClientContext).client;
}