import React, {PropsWithChildren, useEffect, useState} from "react";
import axios from "axios"
import {UserRating} from "../display/UserRating";
import {ApiPaths} from "../../constants/ApiPaths";

export interface AxiosUserRatingProps {
    userId: string
}

export const AxiosUserRating: React.FC<PropsWithChildren<AxiosUserRatingProps>> = ({userId, children}) => {
    const [rating, setRating] = useState<number>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        const loadRating = async () => {
            try {
                const result = await axios.get<{rating: number}>(ApiPaths.ratings.userRating(userId))
                setRating(result.data.rating)
            } catch (err) {
                setError(err.response.data.message)
            }

        }
        loadRating()
    })

    return <UserRating error={error} rating={rating}>{children}</UserRating>
}