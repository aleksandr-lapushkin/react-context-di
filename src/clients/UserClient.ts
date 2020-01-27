import { AxiosInstance } from "axios";

export interface User {
    id: string
    name: string
}

export interface UserClient {
    getUser(id: string): Promise<User>
    getUsers(): Promise<User[]>
}

export class AxiosUserClient implements UserClient {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getUser(id: string): Promise<User> {
        const result = await this.axiosInstance.get<User>(`/api/users/${id}`)

        if (result.data) {
            return result.data;
        }

        throw new Error("Failed to fetch User")
    }

    async getUsers(): Promise<User[]> {
        const result = await this.axiosInstance.get<{users: User[]}>(`/api/users`)

        if (result.data) {
            return result.data.users;
        }

        throw new Error("Failed to fetch Users")
    }

}