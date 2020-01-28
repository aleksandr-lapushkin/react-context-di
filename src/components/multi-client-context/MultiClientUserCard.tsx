import {UserCard} from "../display/UserCard";
import {useClient} from "../../context-clients";
import {User} from "../../clients/UserClient";
import React, {useEffect, useState} from "react";
import {UserRating} from "../display/UserRating";
import {UserAvatar} from "../display/UserAvatar";
import {MultiClientRating} from "./MultiClientRating";

export interface MultiClientUserCardProps {
    userId: string
}

export const MultiClientUserCard: React.FC<MultiClientUserCardProps> = ({userId}) => {
    const userClient = useClient("usersClient");
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await userClient.getUser(userId)
                setUser(data)
            } catch (err) {
                setError(err.message)
            }
        }
        load()
    })

    return <UserCard
        user={user}
        titleRenderer={u => <div><MultiClientRating userId={u.id}><UserAvatar/></MultiClientRating><span style={{margin: '16px'}}>{u.name}</span></div>}
    />
}