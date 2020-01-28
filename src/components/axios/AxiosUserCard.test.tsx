import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {User} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import {StaticRouter} from "react-router";
import React from "react";
import {AxiosUserCard} from "./AxiosUserCard";

describe("Axios-backed UserCard", () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        mock.reset()
    })
    it("Can show a User's details", async () => {
        const user: User = {id: "asd", name: "someone", fullName: "Some One"}

        mock.onGet("/api/users/asd").reply(200, user)
        mock.onGet("/api/users/asd/rating").reply(200, {rating: 42})

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
})