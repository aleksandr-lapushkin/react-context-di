import React, {PropsWithChildren} from "react";
import {Badge, Icon} from "antd";

export interface UserRatingProps {
    rating?: number
}

export const UserRating: React.FC<PropsWithChildren<UserRatingProps>> = ({rating, children}) => {
    if (rating) {
        return <Badge count={rating}>{children}</Badge>
    }

    return <Badge count={<Icon type={"clock-circle"}/>}>{children}</Badge>
}