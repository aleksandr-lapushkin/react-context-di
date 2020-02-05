export const ApiPaths = {
    users: {
        list: "/api/users",
        read: (id: string) => `/api/users/${id}`
    },
    ratings: {
        userRating: (id: string) => `${ApiPaths.users.read(id)}/rating`
    }
}