import {User} from "../../clients/UserClient";
import {Alert, List} from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

export interface UsersListProps {
    errorMessage?: string
    users?: User[]
}

export const UsersList: React.FC<UsersListProps> = ({users, errorMessage}) => {
    const router = useHistory();

    if (users) {
        return (
            <List
                bordered={true}
                header={<h3>Available Users</h3>}
                renderItem={item =>
                    <List.Item
                        key={item.id}
                        title={item.name}
                        style={{cursor: "pointer"}}
                        onClick={() => router.push(`/users/${item.id}`)}>
                        {item.name}
                    </List.Item>
                }
                dataSource={users}
            />
        )
    }
    if (errorMessage) {
        return <Alert showIcon={true} message={`Couldn't fetch Users. Message: '${errorMessage}'`} type={"error"}/>
    }
    return (
        <List
            loading={true}
        />
    )
}