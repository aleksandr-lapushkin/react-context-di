import {User} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import React from "react";
import {AxiosClientUsersList} from "./AxiosClientUsersList";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {MemoryRouter, Route, StaticRouter, Switch} from "react-router";
import {ApiPaths} from "../../constants/ApiPaths";
import { message } from "antd";
import {UiPaths} from "../../constants/UiPaths";
import {AxiosClientUserCard} from "./AxiosClientUserCard";
import { usersClient, ratingsClient } from "../../clients"

const errorMessageSpy = jest.spyOn(message, "warning")
jest.mock("../../clients")

describe("Axios-client-backed UserCard", () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        mock.reset()
    })
    it("Can show a User's details", async () => {
        const user: User = {id: "asd", name: "someone", fullName: "Some One"}
        usersClient.getUser = jest.fn().mockResolvedValue(user)
        ratingsClient.getRatingForUser = jest.fn().mockResolvedValue(42)

        const element = render(
            <StaticRouter>
                <AxiosClientUserCard id={"asd"} />
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        let rating = await element.findByTitle("42");
        expect(rating).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })

    it("Can handle a 404", async () => {
        usersClient.getUser = jest.fn().mockRejectedValue(new Error("Not Found"))

        const element = render(
            <MemoryRouter initialEntries={["/test"]}>
                <Switch>
                    <Route path={"/test"} exact>
                        <AxiosClientUserCard id={"asd"} />
                    </Route>
                    <Route path={UiPaths.root} exact>
                        <p>Not Found</p>
                    </Route>
                </Switch>
            </MemoryRouter>
        )

        let item = await element.findByText("Not Found");
        expect(item).toBeInTheDocument()
        expect(errorMessageSpy).toHaveBeenCalledWith("User Not Found")
    })
})