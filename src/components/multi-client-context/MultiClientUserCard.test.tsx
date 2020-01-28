import {StaticRouter} from "react-router";
import { render } from "@testing-library/react";
import React, {PropsWithChildren} from "react";
import {Clients, ClientsContext} from "../../context-clients";
import {UserClient} from "../../clients/UserClient";
import {mock, instance, when} from "ts-mockito";
import {RatingsClient} from "../../clients/RatingsClient";
import {MultiClientUserCard} from "./MultiClientUserCard";

describe("Multi-client Context-backed UserCard", () => {
    const usersClient: UserClient = mock<UserClient>()
    const ratingsClient: RatingsClient = mock<RatingsClient>()

    it("Can show single User's data", async () => {
        when(usersClient.getUser("1")).thenResolve({id: "1", name: "test-user", fullName: "Test User"})
        when(ratingsClient.getRatingForUser("1")).thenResolve(42)

        const element = render(
            <ClientsContext.Provider value={{
                usersClient: instance(usersClient),
                ratingsClient: instance(ratingsClient)}}
            >
                <MultiClientUserCard userId={"1"}/>
            </ClientsContext.Provider>
        )

        const ratingElement = await element.findByTitle("42")
        expect(ratingElement).toBeInTheDocument()
        const nameElement = await element.findByText("test-user")
        expect(nameElement).toBeInTheDocument()

        expect(element.container).toMatchSnapshot()
    })

})