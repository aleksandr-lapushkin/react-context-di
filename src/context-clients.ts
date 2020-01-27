import {AxiosUserClient, UserClient} from "./clients/UserClient";
import {AxiosRatingsClient, RatingsClient} from "./clients/RatingsClient";
import axios from "axios";
import React, {useContext} from "react";

interface Clients {
    usersClient: UserClient
    ratingsClient: RatingsClient
}

let axiosInstance = axios.create();
export const ClientsContext = React.createContext<Clients>({
    usersClient: new AxiosUserClient(axiosInstance),
    ratingsClient: new AxiosRatingsClient(axiosInstance)
})

export function useClient<K extends keyof Clients>(key: K): Clients[K] {
    const context = useContext(ClientsContext)

    return context[key]
}