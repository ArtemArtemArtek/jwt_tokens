import { IUser } from "../../../models/models";

export interface IState {
    user: IUser,
    isAuth: boolean,
    isLoading: boolean
}

export enum ActionTypesEnum {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

export type SetAuthAction = {
    type: ActionTypesEnum.SET_AUTH,
    payload: boolean
}
export type SetUserAction = {
    type: ActionTypesEnum.SET_USER,
    payload: IUser
}
export type SetIsLoadingAction = {
    type: ActionTypesEnum.SET_IS_LOADING,
    payload: boolean
}

export type ActionTypes = SetAuthAction
    | SetUserAction
    | SetIsLoadingAction