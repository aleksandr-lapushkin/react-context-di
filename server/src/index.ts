import {Request, Response} from "express";
import {User} from "./models/User";

const express = require('express')
const app = express()
const port = 4000

const users = [new User("1", "bob"), new User("2", "john"), new User("3", "mike")]
const byId = new Map(users.map(user => [user.id, user]))
const userRatings = new Map(users.map(user => [user.id, (Math.random() * 100)]))

app.get('/api/users', (req: Request, res: Response) => {
    setTimeout(() => res.send({users}), 200)
    // setTimeout(() => res.status(500).send({message: "oops"}), 200)
})

app.get('/api/users/:id', (req: Request<{id: string}>, res: Response) => {
    const user = byId.get(req.params.id)
    if (user) {
        setTimeout(() => res.send(user), 200)
    } else {
        res.status(404).send("Not Found")
    }
})

app.get('/api/users/:id/rating', (req: Request<{id: string}>, res: Response) => {
    const rating = userRatings.get(req.params.id)
    if (rating) {
        setTimeout(() => res.send({rating: Math.floor(rating)}), 500)
    } else {
        res.status(404).send("Not Found")
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))