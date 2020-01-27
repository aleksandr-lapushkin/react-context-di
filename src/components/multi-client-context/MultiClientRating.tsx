import React, {PropsWithChildren, useEffect, useState} from "react";
import {useClient} from "../../context-clients";
import {UserRating} from "../display/UserRating";

export interface MultiClientRatingProps {
    userId: string
}

export const MultiClientRating: React.FC<PropsWithChildren<MultiClientRatingProps>> = ({userId, children}) => {
    const [rating, setRating] = useState<number>()
    const ratingsClient = useClient("ratingsClient")
    useEffect(() => {
        const loadRating = async () => {
            const result = await ratingsClient.getRatingForUser(userId)
            setRating(result)
        }
        loadRating()
    })

    return <UserRating rating={rating}>{children}</UserRating>

}