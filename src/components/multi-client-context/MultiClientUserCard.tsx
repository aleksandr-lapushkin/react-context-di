import {UserCard} from "../display/UserCard";
import {useClient} from "../../context-clients";
import {ResultCode, ResultType, User} from "../../clients/UserClient";
import React, {useEffect, useState} from "react";
import {UserAvatar} from "../display/UserAvatar";
import {MultiClientRating} from "./MultiClientRating";
import {useHistory} from "react-router";
import {UiPaths} from "../../constants/UiPaths";
import {message} from "antd";

export interface MultiClientUserCardProps {
    id: string
}

export const MultiClientUserCard: React.FC<MultiClientUserCardProps> = ({id}) => {
    const userClient = useClient("usersClient");
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();
    const history = useHistory();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await userClient.getUser(id)
                setUser(data)
            } catch (err) {
                if (err.message === "Not Found") {
                    message.warning("User Not Found")
                    history.replace(UiPaths.root)
                } else {
                    setError(err.message)
                }
            }
        }
        load()
    })
    // useEffect(() => {
    //     const load = async () => {
    //         (await userClient.getUserSafe(userId))
    //             .fold<void>(
    //                 user => {
    //                     setUser(user)
    //                 },
    //                 resultCode => {
    //                     if (resultCode === ResultCode.NOT_FOUND) {
    //                         message.warning("User Not Found")
    //                         history.replace(UiPaths.root)
    //                     } else {
    //                         message.warning("Failed to fetch User")
    //                     }
    //                 },
    //                 () => message.warning("Failed to fetch User")
    //             )
    //     }
    //     load()
    // })

    return <UserCard
        user={user}
        title={u =>
            <div>
                <MultiClientRating userId={u.id}>
                    <UserAvatar/>
                </MultiClientRating>
                <span style={{margin: '16px'}}>{u.name}</span>
            </div>
        }
    />
}