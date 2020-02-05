import * as React from "react";
import {useState} from "react";
import {User} from "../../clients/UserClient";
import {useHistory} from "react-router";
import {useEffect} from "react";
import axios from "axios";
import {ApiPaths} from "../../constants/ApiPaths";
import {message} from "antd";
import {UiPaths} from "../../constants/UiPaths";
import {UserCard} from "../display/UserCard";
import {AxiosUserRating} from "../axios/AxiosUserRating";
import {UserAvatar} from "../display/UserAvatar";
import {usersClient} from "../../clients";
import {AxiosClientUserRating} from "./AxiosClientUserRating";

export interface AxiosClientUserCardProps {
    id: string
}

export const AxiosClientUserCard: React.FC<AxiosClientUserCardProps> = ({id}) => {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();
    const history = useHistory()

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchResult = await usersClient.getUser(id)
                setUser(fetchResult)
            } catch (err) {
                if (err.message === "Not Found") {
                    message.warning("User Not Found");
                    history.replace(UiPaths.root)
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
                <AxiosClientUserRating userId={u.id}>
                    <UserAvatar/>
                </AxiosClientUserRating>
                <span style={{margin: "16px"}}>{u.name}</span>
            </div>
        }/>
}