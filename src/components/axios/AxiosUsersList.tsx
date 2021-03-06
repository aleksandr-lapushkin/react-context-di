import React, {useEffect, useState} from "react";
import {User} from "../../clients/UserClient";
import axios from "axios"
import {UsersList} from "../display/UsersList";
import {ApiPaths} from "../../constants/ApiPaths";

export const AxiosUsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchResult = await axios.get<{users: User[]}>(ApiPaths.users.list)
                if (fetchResult.data) {
                    setUsers(fetchResult.data.users)
                }
            } catch (err) {
                setError(err.response.data.message)
            }
        }
        loadData()
    }, [])

    return (
        <UsersList users={users} errorMessage={error}/>
    )
}