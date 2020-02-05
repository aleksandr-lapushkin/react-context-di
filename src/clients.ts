import {AxiosUserClient, UserClient} from "./clients/UserClient";
import axios from "axios";
import {AxiosRatingsClient, RatingsClient} from "./clients/RatingsClient";

let axiosInstance = axios.create();
export const usersClient: UserClient = new AxiosUserClient(axiosInstance)
export const ratingsClient: RatingsClient = new AxiosRatingsClient(axiosInstance)