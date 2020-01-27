import {User} from "../../clients/UserClient";
import React, {useEffect, useState} from "react";
import {UsersList} from "../display/UsersList";
import {usersClient} from "../../clients";

export const AxiosClientUsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await usersClient.getUsers()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            }
        }
        loadData()
    })

    return (
        <UsersList users={users} errorMessage={error}/>
    );
}