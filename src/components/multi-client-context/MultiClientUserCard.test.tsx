import {render} from "@testing-library/react";
import React from "react";
import {ClientsContext} from "../../context-clients";
import {ResultCode, ServerFailureImpl, UserClient} from "../../clients/UserClient";
import {instance, mock, when} from "ts-mockito";
import {RatingsClient} from "../../clients/RatingsClient";
import {MultiClientUserCard} from "./MultiClientUserCard";
import {message} from "antd";
import {MemoryRouter, Route, StaticRouter, Switch} from "react-router";
import {UiPaths} from "../../constants/UiPaths";

const errorMessageSpy = jest.spyOn(message, "warning")

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
                <StaticRouter>
                    <MultiClientUserCard id={"1"}/>
                </StaticRouter>
            </ClientsContext.Provider>
        )

        const ratingElement = await element.findByTitle("42")
        expect(ratingElement).toBeInTheDocument()
        const nameElement = await element.findByText("test-user")
        expect(nameElement).toBeInTheDocument()

        expect(element.container).toMatchSnapshot()
    })

    it("Can handle Not Found error", async () => {
        when(usersClient.getUser("1")).thenReject(new Error("Not Found"))
        // when(usersClient.getUserSafe("1")).thenResolve(new ServerFailureImpl(ResultCode.NOT_FOUND))

        const element = render(
            <ClientsContext.Provider value={{
                usersClient: instance(usersClient),
                ratingsClient: instance(ratingsClient)}}
            >
                <MemoryRouter initialEntries={["/test"]}>
                    <Switch>
                        <Route path={"/test"}>
                            <MultiClientUserCard id={"1"}/>
                        </Route>
                        <Route path={UiPaths.root}>
                            <p>Not Found</p>
                        </Route>
                    </Switch>
                </MemoryRouter>
            </ClientsContext.Provider>
        )

        const notFoundElement = await element.findByText("Not Found")
        expect(notFoundElement).toBeInTheDocument()
        expect(errorMessageSpy).toHaveBeenCalledWith("User Not Found")
        expect(element.container).toMatchSnapshot()
    })

})