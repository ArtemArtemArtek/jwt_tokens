import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

export interface IState {
    user: IUser,
    refreshToken: string,
    accessToken: string
}

const initialState: IState = {
    user: {
        // email: '',
        // isActive: false,
        // id: 0
    } as IUser,
    refreshToken: '',
    accessToken: ''
}