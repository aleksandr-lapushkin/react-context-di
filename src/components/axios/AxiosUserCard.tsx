import * as React from "react";
import {UserCard} from "../display/UserCard";
import axios from "axios";
import {User} from "../../clients/UserClient";
import {useEffect, useState} from "react";
import {UserAvatar} from "../display/UserAvatar";
import {AxiosUserRating} from "./AxiosUserRating";
import {ApiPaths} from "../../constants/ApiPaths";
import {useHistory} from "react-router";
import {UiPaths} from "../../constants/UiPaths";
import {message} from "antd";

export interface AxiosUserCardProps {
    id: string
}

export const AxiosUserCard: React.FC<AxiosUserCardProps> = ({id}) => {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();
    const history = useHistory()

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchResult = await axios.get<User>(ApiPaths.users.read(id))
                if (fetchResult.data) {
                    setUser(fetchResult.data)
                }
            } catch (err) {
                if (err?.response?.status === 404) {
                    message.warning("User Not Found");
                    history.replace(UiPaths.root)
                } else if (err?.response?.data?.message) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
            }
        }
        loadData()
    }, [id])

    return <UserCard
        user={user}
        error={error}
        title={u =>
            <div>
                <AxiosUserRating userId={u.id}>
                    <UserAvatar/>
                </AxiosUserRating>
                <span style={{margin: "16px"}}>{u.name}</span>
            </div>
        }/>
}