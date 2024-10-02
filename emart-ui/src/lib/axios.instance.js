import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000", //backend url
});

axiosInstance.interceptors.request.use(function (config){
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
        return config;
});
export default axiosInstance;