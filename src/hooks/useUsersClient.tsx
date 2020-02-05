import {AxiosUserClient, Result, ResultCode, User, UserClient} from "../clients/UserClient";
import axios from "axios";
import React from "react";

interface UsersClientContextValue {
    client: UserClient
}

export const UsersClientContext = React.createContext<UsersClientContextValue>({client: new class implements UserClient {
        getUser(id: string): Promise<User> {
            throw new Error("Client not initialized")
        }

        getUserSafe(id: string): Promise<Result<User, ResultCode>> {
            throw new Error("Client not initialized")
        }

        getUsers(): Promise<User[]> {
            throw new Error("Client not initialized")
        }
    }})

export function useUsersClient(): UserClient {
    return React.useContext(UsersClientContext).client;
}