import {User, UserClient} from "../../clients/UserClient";
import {usersClient} from "../../clients";
import {render} from "@testing-library/react";
import {StaticRouter} from "react-router";
import {AxiosClientUsersList} from "../axios-client/AxiosClientUsersList";
import React from "react";
import {instance, mock, reset, when} from "ts-mockito";
import {ContextClientUsersList} from "./ContextClientUsersList";
import {UsersClientContext} from "../../hooks/useClient";

describe("Context-backed UsersList", () => {
    const usersClient = mock<UserClient>()
    beforeEach(() => {
        reset(usersClient)
    })
    it("Can fetch a list of users", async () => {
        const users: User[] = [{id: "asd", name: "someone"}]
        when(usersClient.getUsers()).thenResolve(users)
        const element = render(
            <StaticRouter>
                <UsersClientContext.Provider value={{client: instance(usersClient)}}>
                    <ContextClientUsersList />
                </UsersClientContext.Provider>
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
    it("Can handle loading error", async () => {
        when(usersClient.getUsers()).thenReject(new Error("Something went wrong"))
        const element = render(
            <StaticRouter>
                <UsersClientContext.Provider value={{client: instance(usersClient)}}>
                    <ContextClientUsersList />
                </UsersClientContext.Provider>
            </StaticRouter>
        )

        let item = await element.findByText("Couldn't fetch Users. Message: 'Something went wrong'");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
})