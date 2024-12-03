export interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    email: string;
}

export interface UserProfile extends UserData {
    password: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface UserProfileToken {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface LoginUserApiResponse {
    token: string;
    user: UserData;
}
