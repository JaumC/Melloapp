import { AxiosError, AxiosResponse } from "axios";

export interface User {
    id: string;
    token?: string;
    name?: string;
    email?: string;
    tot_score?: string;
    competition?: string;
    nickname?: string;
    search_id?: string;
    profilePic?: string;
    password?: string;
    color?: string;
    friends?: string[];
}

export interface DareWithDayPoints {
    dare: Dare;
    dayPoints: DayPoint;
}

export interface Dare {
    _id?: string,
    name?: string;
    start_date?: string;
    end_date?: string;
    days?: string;
    weekend?: boolean;
    challengers?: string[];
    host?: string;
    day_sequency?: string;
    mounth_sequency?: string;
    streak?: number;
    finishedDare?: boolean;
}

export interface DayPoint {
    days: {
        [date: string]: DayEntry[];
    };
}

export interface DayEntry {
    user_id: string;
    marked_at: Date;
    points: number;
}

export interface ApiResponse<T = any> {
  type: string;
  title: string;
  message: string;
  content?: T;
}


export type ApiAxiosResponse<T = any> = AxiosResponse<ApiResponse<T>>;
export type ApiAxiosError<T = any> = AxiosError<ApiResponse<T>>;