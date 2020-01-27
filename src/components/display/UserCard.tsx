import {User} from "../../clients/UserClient";
import React from "react";
import {Avatar, Card, Spin} from "antd";
import {UserRating} from "./UserRating";
import {UserAvatar} from "./UserAvatar";
import {MultiClientRating} from "../multi-client-context/MultiClientRating";

interface UserCardProps {
    user?: User
}

export const UserCard: React.FC<UserCardProps> = ({user}) => {
    if (user) {
        return (
            <Card title={<div><MultiClientRating userId={user.id}><UserAvatar/></MultiClientRating>{` ${user.name}`}</div>}>
                <div>
                    <div>ID: {user.id}</div>
                </div>


            </Card>
        )
    }
    return (
        <Card>
            <Spin/>
        </Card>
    )
}

