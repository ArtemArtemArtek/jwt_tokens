import axios, { AxiosPromise } from "axios";
import axios_config from "../http_requests/config";
import { IUser } from "../models/models";

export class UserService{
    static getUsers():Promise<AxiosPromise<IUser[]>>{
         return axios_config.get<IUser[]>('/users').then()
    }
}