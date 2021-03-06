import {AxiosUsersList} from "./AxiosUsersList";
import { render } from "@testing-library/react"
import React from "react";
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import {User} from "../../clients/UserClient";
import {StaticRouter} from "react-router";
import {ApiPaths} from "../../constants/ApiPaths";

describe("Axios-backed UsersList", () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        mock.reset()
    })

    it("Can fetch a list of users", async () => {
        const users: User[] = [{id: "asd", name: "someone", fullName: "Some One"}]
        mock.onGet(ApiPaths.users.list).reply(200, {users: users})

        const element = render(
            <StaticRouter>
                <AxiosUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })

    it("Can handle loading error", async () => {
        mock.onGet(ApiPaths.users.list).reply(500, {message: "Something went wrong"})

        const element = render(
            <StaticRouter>
                <AxiosUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("Couldn't fetch Users. Message: 'Something went wrong'");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
})