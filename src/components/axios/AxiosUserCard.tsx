import * as React from "react";
import {UserCard} from "../display/UserCard";
import axios from "axios";
import {User} from "../../clients/UserClient";
import {useEffect, useState} from "react";

export interface AxiosUserCardProps {
    id: string
}

export const AxiosUserCard: React.FC<AxiosUserCardProps> = ({id}) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const loadData = async () => {
            const fetchResult = await axios.get<User>(`/api/users/${id}`)
            if (fetchResult.data) {
                setUser(fetchResult.data)
            }
        }
        loadData()
    }, [id])

    return <UserCard user={user}/>
}