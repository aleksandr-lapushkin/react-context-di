import {AxiosUserClient, Result, ResultCode, User, UserClient} from "./clients/UserClient";
import {AxiosRatingsClient, RatingsClient} from "./clients/RatingsClient";
import axios from "axios";
import React, {useContext} from "react";

export interface Clients {
    usersClient: UserClient
    ratingsClient: RatingsClient
}


export const ClientsContext = React.createContext<Clients>({
    usersClient: new class implements UserClient {
        getUser(id: string): Promise<User> {
            throw new Error("Client not initialized")
        }

        getUserSafe(id: string): Promise<Result<User, ResultCode>> {
            throw new Error("Client not initialized")
        }

        getUsers(): Promise<User[]> {
            throw new Error("Client not initialized")
        }
    },
    ratingsClient: new class implements RatingsClient {
        getRatingForUser(id: string): Promise<number> {
            throw new Error("Client not initialized")
        }
    }
})

export function useClient<K extends keyof Clients>(key: K): Clients[K] {
    const context = useContext(ClientsContext)

    return context[key]
}