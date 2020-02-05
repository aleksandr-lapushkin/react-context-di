import {User, UserClient} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import React from "react";
import {MemoryRouter, Route, StaticRouter, Switch} from "react-router";
import { message } from "antd";
import {UiPaths} from "../../constants/UiPaths";
import {ContextClientUserCard} from "./ContextClientUserCard";
import {UsersClientContext} from "../../hooks/useUsersClient";
import {instance, mock, reset, when} from "ts-mockito";
import {RatingsClient} from "../../clients/RatingsClient";
import {RatingsClientContext} from "../../hooks/useRatingsClient";

const errorMessageSpy = jest.spyOn(message, "warning")

describe("Context-client-backed UserCard", () => {
    const userClientMock = mock<UserClient>()
    const ratingsClientMock = mock<RatingsClient>()
    beforeEach(() => {
        reset(userClientMock)
        reset(ratingsClientMock)
    })
    it("Can show a User's details", async () => {
        const user: User = {id: "asd", name: "someone", fullName: "Some One"}
        when(userClientMock.getUser("asd")).thenResolve(user)
        when(ratingsClientMock.getRatingForUser("asd")).thenResolve(42)

        const element = render(
            <StaticRouter>
                <UsersClientContext.Provider value={{
                    client: instance(userClientMock)
                }}>
                    <RatingsClientContext.Provider value={{
                        client: instance(ratingsClientMock)
                    }}>
                        <ContextClientUserCard id={"asd"} />
                    </RatingsClientContext.Provider>
                </UsersClientContext.Provider>
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        let rating = await element.findByTitle("42");
        expect(rating).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })

    it("Can handle a 404", async () => {
        when(userClientMock.getUser("asd")).thenReject(new Error("Not Found"))

        const element = render(
            <UsersClientContext.Provider value={{
                client: instance(userClientMock)
            }}>
                <MemoryRouter initialEntries={["/test"]}>
                    <Switch>
                        <Route path={"/test"} exact>
                            <ContextClientUserCard id={"asd"} />
                        </Route>
                        <Route path={UiPaths.root} exact>
                            <p>Not Found</p>
                        </Route>
                    </Switch>
                </MemoryRouter>
            </UsersClientContext.Provider>
        )

        let item = await element.findByText("Not Found");
        expect(item).toBeInTheDocument()
        expect(errorMessageSpy).toHaveBeenCalledWith("User Not Found")
    })
})