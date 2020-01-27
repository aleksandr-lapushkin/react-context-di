import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {User, UserClient} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import {StaticRouter} from "react-router";
import {AxiosUsersList} from "../axios/AxiosUsersList";
import React from "react";
import {AxiosClientUsersList} from "./AxiosClientUsersList";
import { mock, reset, instance, when } from "ts-mockito"
import { usersClient } from "../../clients";

jest.mock("../../clients", () => ({usersClient: {getUsers: jest.fn()}}))

describe("UsersClient-backed UsersList", () => {
    beforeEach(() => {

    })
    it("Can fetch a list of users", async () => {
        const users: User[] = [{id: "asd", name: "someone"}]
        usersClient.getUsers = jest.fn().mockResolvedValue(users)
        const element = render(
            <StaticRouter>
                <AxiosClientUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
    it("Can handle loading error", async () => {
        usersClient.getUsers = jest.fn().mockRejectedValue(new Error("Something went wrong"))
        const element = render(
            <StaticRouter>
                <AxiosClientUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("Couldn't fetch Users. Message: 'Something went wrong'");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
})