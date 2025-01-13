import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/models";
import { IState, ActionTypesEnum, ActionTypes, SetAuthAction, SetUserAction, SetIsLoadingAction } from "./types";
import { AppDispatch } from "../../store.tsx";
import { AuthService } from "../../../services/AuthService.tsx";


export const AuthActionCreators = {
    setAuth: (isAuth: boolean): SetAuthAction => ({ type: ActionTypesEnum.SET_AUTH, payload: isAuth }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({ type: ActionTypesEnum.SET_IS_LOADING, payload: isLoading }),
    setUser: (user: IUser): SetUserAction => ({ type: ActionTypesEnum.SET_USER, payload: user }),
    login: (login: string, email: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await AuthService.login(login, email)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(AuthActionCreators.setUser(response.data.user))
            dispatch(AuthActionCreators.setAuth(true))
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (error) {
            console.log(error)
        }
    },
    registration: (login: string, email: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await AuthService.registration(login, email)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(AuthActionCreators.setUser(response.data.user))
            dispatch(AuthActionCreators.setAuth(true))
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (error) {
            console.log(error)
        }
    },
    logout: () => (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setUser({} as IUser))
            localStorage.removeItem('token')
            dispatch(AuthActionCreators.setAuth(false))
        } catch (error) {
            console.log(error)
        }
    }
}