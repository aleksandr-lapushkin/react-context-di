import {User} from "../../clients/UserClient";
import React from "react";
import {Alert, Avatar, Card, Spin} from "antd";
import {UserRating} from "./UserRating";
import {UserAvatar} from "./UserAvatar";
import {MultiClientRating} from "../multi-client-context/MultiClientRating";

interface UserCardProps {
    user?: User
    error?: string
    title: ((user: User) => React.ReactNode) | React.ReactNode
}

export const UserCard: React.FC<UserCardProps> = ({user, title, error}) => {
    if (user) {
        return (
            <Card title={<div>{typeof title === "function" ? title(user) : title}</div>}>
                <div>
                    <div>ID: {user.id}</div>
                    <div>Full Name: {user.fullName}</div>
                </div>
            </Card>
        )
    }
    if (error) {
        return (
            <Card>
                <Alert message={`Unable to load User: ${error}`} type={"error"}/>
            </Card>
        )
    }
    return (
        <Card>
            <Spin/>
        </Card>
    )
}

