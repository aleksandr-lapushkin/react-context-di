import { AxiosInstance } from "axios";
import {ApiPaths} from "../constants/ApiPaths";

export interface RatingsClient {
    getRatingForUser(id: string): Promise<number>
}

export class AxiosRatingsClient implements RatingsClient {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    async getRatingForUser(id: string): Promise<number> {
        const result = await this.axiosInstance.get<{rating: number}>(ApiPaths.ratings.userRating(id))

        if (result.data) {
            return result.data.rating
        }

        throw new Error("Unable to fetch Rating")
    }

}