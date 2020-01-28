import React, {PropsWithChildren} from "react";
import {Badge, Icon} from "antd";

export interface UserRatingProps {
    rating?: number
    error?: string
}

export const UserRating: React.FC<PropsWithChildren<UserRatingProps>> = ({rating, children, error}) => {
    if (rating) {
        return <Badge count={rating}>{children}</Badge>
    }

    if (error) {
        return <Badge count={<Icon type={"close-circle"}/>}>{children}</Badge>
    }

    return <Badge count={<Icon type={"clock-circle"}/>}>{children}</Badge>
}