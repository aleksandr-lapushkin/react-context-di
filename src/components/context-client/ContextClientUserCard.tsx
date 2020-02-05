import * as React from "react";
import {useState} from "react";
import {User} from "../../clients/UserClient";
import {useHistory} from "react-router";
import {useEffect} from "react";
import {message} from "antd";
import {UiPaths} from "../../constants/UiPaths";
import {UserCard} from "../display/UserCard";
import {AxiosClientUserRating} from "../axios-client/AxiosClientUserRating";
import {UserAvatar} from "../display/UserAvatar";
import {AxiosClientUserCardProps} from "../axios-client/AxiosClientUserCard";
import {useUsersClient} from "../../hooks/useUsersClient";
import {useRatingsClient} from "../../hooks/useRatingsClient";
import {ContextClientUserRating} from "./ContextClientUserRating";

export const ContextClientUserCard: React.FC<AxiosClientUserCardProps> = ({id}) => {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();
    const history = useHistory();
    const usersClient = useUsersClient();

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
                <ContextClientUserRating userId={u.id}>
                    <UserAvatar/>
                </ContextClientUserRating>
                <span style={{margin: "16px"}}>{u.name}</span>
            </div>
        }/>
}