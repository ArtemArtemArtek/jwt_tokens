import axios, { AxiosPromise } from "axios";
import axios_config from "../http_requests/config";
import { AuthResponse } from "../models/models";

export class AuthService {
    static async login(login: string, email: string): Promise<AxiosPromise<AuthResponse>> {
        return axios_config.post<AuthResponse>('/login', { login, email })
    }

    static async registration(login: string, email: string): Promise<AxiosPromise<AuthResponse>> {
        return axios_config.post<AuthResponse>('/registration', { login, email })
    }

    static async logout(): Promise<void> {
        return axios_config.post('/logout')
    }
}