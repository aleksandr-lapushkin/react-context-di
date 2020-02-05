import React, {useEffect, useState} from "react";
import {User} from "../../clients/UserClient";
import {UsersList} from "../display/UsersList";
import {useClient} from "../../context-clients";

export const MultiClientUsersList: React.FC = () => {
    const client = useClient("usersClient");
    const [users, setUsers] = useState<User[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await client.getUsers()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            }
        }
        loadData()
    })

    return <UsersList users={users} errorMessage={error}/>
}