import {AxiosUserClient, UserClient} from "./clients/UserClient";
import axios from "axios";

export const usersClient: UserClient = new AxiosUserClient(axios.create())