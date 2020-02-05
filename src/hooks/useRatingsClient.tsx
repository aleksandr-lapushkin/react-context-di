import {AxiosRatingsClient, RatingsClient} from "../clients/RatingsClient";
import axios from "axios";
import React from "react";

interface RatingsClientContextValue {
    client: RatingsClient
}

export const RatingsClientContext = React.createContext<RatingsClientContextValue>({client: new class implements RatingsClient {
        getRatingForUser(id: string): Promise<number> {
            throw new Error("Client not initialized")
        }
    }})

export function useRatingsClient(): RatingsClient {
    return React.useContext(RatingsClientContext).client;
}