import { API_URL } from "@/utils/Constants";
import axios from "axios";

export const AxiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true,

    })