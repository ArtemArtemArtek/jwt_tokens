import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/models";
import { IState, ActionTypesEnum, ActionTypes } from "./types.ts";


const initialState: IState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false
}

export default function authReducer(state = initialState, action: ActionTypes): IState {
    switch (action.type) {
        case ActionTypesEnum.SET_AUTH:
            return { ...state, isAuth: action.payload }
        case ActionTypesEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case ActionTypesEnum.SET_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}