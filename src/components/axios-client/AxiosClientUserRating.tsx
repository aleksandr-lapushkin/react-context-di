import React, {PropsWithChildren, useEffect, useState} from "react";
import axios from "axios";
import {ApiPaths} from "../../constants/ApiPaths";
import {UserRating} from "../display/UserRating";
import {ratingsClient} from "../../clients";

export interface AxiosUserRatingProps {
    userId: string
}

export const AxiosClientUserRating: React.FC<PropsWithChildren<AxiosUserRatingProps>> = ({userId, children}) => {
    const [rating, setRating] = useState<number>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        const loadRating = async () => {
            try {
                const result = await ratingsClient.getRatingForUser(userId)
                setRating(result)
            } catch (err) {
                setError(err.message)
            }

        }
        loadRating()
    })

    return <UserRating error={error} rating={rating}>{children}</UserRating>
}