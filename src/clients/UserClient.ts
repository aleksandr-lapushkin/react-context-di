import { AxiosInstance } from "axios";
import {ApiPaths} from "../constants/ApiPaths";

export interface User {
    id: string
    name: string
    fullName: string
}

export interface UserClient {
    getUser(id: string): Promise<User>
    getUsers(): Promise<User[]>
    getUserSafe(id: string): Promise<Result<User, ResultCode>>
}

export class AxiosUserClient implements UserClient {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getUser(id: string): Promise<User> {
        try {
            const result = await this.axiosInstance.get<User>(ApiPaths.users.read(id))

            if (result.data) {
                return result.data;
            }
        } catch (err) {
            if (err?.response?.status === 404) {
                throw new Error("Not Found")
            }
            throw err
        }

        throw new Error("Failed to fetch User")
    }

    async getUsers(): Promise<User[]> {
        const result = await this.axiosInstance.get<{users: User[]}>(ApiPaths.users.list)

        if (result.data) {
            return result.data.users;
        }

        throw new Error("Failed to fetch Users")
    }

    async getUserSafe(id: string): Promise<Result<User, ResultCode>> {
        try {
            const result = await this.axiosInstance.get<User>(ApiPaths.users.read(id))
            return new SuccessImpl<User>(result.data)

        } catch (err) {
            if (err?.response?.status === 404) {
                return new ServerFailureImpl<ResultCode>(ResultCode.NOT_FOUND)
            }
            if (err?.response?.data) {
                return new ServerFailureImpl(ResultCode.UNKNOWN)
            }
            return new RequestFailureImpl(err.toString())
        }
    }

}












//Bonus stuff
export enum ResultCode {
    OK,
    NOT_FOUND,
    UNKNOWN
}
export enum ResultType {
    SUCCESS,
    SERVER_FAILURE,
    REQUEST_FAILURE
}
interface Success<T> extends Fold<T, any>{
    data: T,
    type: ResultType.SUCCESS
}
interface SuccessFolder<T, O> {
    (data: T): O
}
interface ServerFailure<E> extends Fold<any, E>{
    error: E,
    type: ResultType.SERVER_FAILURE
}
interface ServerFailureFolder<E, O> {
    (data: E): O
}
interface RequestFailure extends Fold<any, any> {
    message?: string,
    type: ResultType.REQUEST_FAILURE
}
interface RequestFailureFolder<O> {
    (data?: string): O
}
interface Fold<T, E> {
    fold: <O>(s: SuccessFolder<T, O>, sf: ServerFailureFolder<E, O>, rf: RequestFailureFolder<O>) => O
}
export type Result<T, E> = (Success<T> | ServerFailure<E> | RequestFailure) & Fold<T, E>
export class SuccessImpl<T> implements Success<T> {
    data: T;
    type: ResultType.SUCCESS;

    constructor(data: T) {
        this.type = ResultType.SUCCESS
        this.data = data
    }

    public fold<O>(s: SuccessFolder<T, O>, sf: ServerFailureFolder<any, O>, rf: RequestFailureFolder<O>): O {
        return s(this.data)
    }
}
export class ServerFailureImpl<E> implements ServerFailure<E> {
    error: E;
    type: ResultType.SERVER_FAILURE;
    constructor(error: E) {
        this.type = ResultType.SERVER_FAILURE;
        this.error = error;
    }
    fold<O>(s: SuccessFolder<any, O>, sf: ServerFailureFolder<E, O>, rf: RequestFailureFolder<O>): O {
        return sf(this.error)
    }
}
export class RequestFailureImpl implements RequestFailure {
    message?: string;
    type: ResultType.REQUEST_FAILURE;
    constructor(message?: string) {
        this.message = message;
        this.type = ResultType.REQUEST_FAILURE;
    }
    fold<O>(s: SuccessFolder<any, O>, sf: ServerFailureFolder<any, O>, rf: RequestFailureFolder<O>): O {
        return rf(this.message)
    }

}