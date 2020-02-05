import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {User} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import {MemoryRouter, Route, StaticRouter, Switch} from "react-router";
import React from "react";
import {AxiosUserCard} from "./AxiosUserCard";
import {ApiPaths} from "../../constants/ApiPaths";
import { message } from "antd";
import {UiPaths} from "../../constants/UiPaths";

const errorMessageSpy = jest.spyOn(message, "warning")

describe("Axios-backed UserCard", () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        mock.reset()
    })
    it("Can show a User's details", async () => {
        const user: User = {id: "asd", name: "someone", fullName: "Some One"}

        mock.onGet(ApiPaths.users.read("asd")).reply(200, user)
        mock.onGet(ApiPaths.ratings.userRating("asd")).reply(200, {rating: 42})

        const element = render(
            <StaticRouter>
                <AxiosUserCard id={"asd"} />
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        let rating = await element.findByTitle("42");
        expect(rating).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
    it("Can handle a 404", async () => {
        mock.onGet(ApiPaths.users.read("asd")).reply(404, {message: "Not Found"})

        const element = render(
            <MemoryRouter initialEntries={["/test"]}>
                <Switch>
                    <Route path={"/test"} exact>
                        <AxiosUserCard id={"asd"} />
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