export interface IUser {
    email: String,
    isActive: Boolean,
    id: number
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser
}