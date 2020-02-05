import React, {PropsWithChildren, useEffect, useState} from "react";
import {UserRating} from "../display/UserRating";
import {useRatingsClient} from "../../hooks/useRatingsClient";

export interface ContextClientUserRatingProps {
    userId: string
}

export const ContextClientUserRating: React.FC<PropsWithChildren<ContextClientUserRatingProps>> = ({userId, children}) => {
    const [rating, setRating] = useState<number>()
    const [error, setError] = useState<string>()
    const ratingsClient = useRatingsClient()

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