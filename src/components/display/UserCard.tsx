import {User} from "../../clients/UserClient";
import React from "react";
import {Avatar, Card, Spin} from "antd";
import {UserRating} from "./UserRating";
import {UserAvatar} from "./UserAvatar";
import {MultiClientRating} from "../multi-client-context/MultiClientRating";

interface UserCardProps {
    user?: User
    titleRenderer: (user: User) => React.ReactNode
}

export const UserCard: React.FC<UserCardProps> = ({user, titleRenderer}) => {
    if (user) {
        return (
            <Card title={<div>{titleRenderer(user)}</div>}>
                <div>
                    <div>ID: {user.id}</div>
                    <div>Full Name: {user.fullName}</div>
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

