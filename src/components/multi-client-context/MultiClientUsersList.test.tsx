import {instance, mock, reset, when} from "ts-mockito";
import {User, UserClient} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import {StaticRouter} from "react-router";
import {UsersClientContext} from "../../hooks/useUsersClient";
import {ContextClientUsersList} from "../context-client/ContextClientUsersList";
import React from "react";
import { ClientsContext } from "../../context-clients";
import {RatingsClient} from "../../clients/RatingsClient";
import {MultiClientUsersList} from "./MultiClientUsersList";

describe("Multi-client Context-backed UsersList", () => {
    const usersClient = mock<UserClient>()
    beforeEach(() => {
        reset(usersClient)
    })
    it("Can fetch a list of users", async () => {
        const users: User[] = [{id: "asd", name: "someone", fullName: "Some One"}]
        when(usersClient.getUsers()).thenResolve(users)
        const element = render(
            <StaticRouter>
                <ClientsContext.Provider value={{usersClient: instance(usersClient), ratingsClient: mock<RatingsClient>()}}>
                    <MultiClientUsersList />
                </ClientsContext.Provider>
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
                <ClientsContext.Provider value={{usersClient: instance(usersClient), ratingsClient: mock<RatingsClient>()}}>
                    <MultiClientUsersList />
                </ClientsContext.Provider>
            </StaticRouter>
        )

        let item = await element.findByText("Couldn't fetch Users. Message: 'Something went wrong'");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
})