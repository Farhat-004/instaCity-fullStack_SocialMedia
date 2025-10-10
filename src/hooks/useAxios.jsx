import { useEffect } from "react";
import { api } from "../api/api";
import useAuth from "./useAuth";
import axios from "axios";
export default function useAxios() {
    const { auth, setAuth } = useAuth();
    // console.log(auth);

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                let authToken = auth?.accessToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`; //Before sending this request,
                    //  attach the Authorization header with user's authToken, so the server knows user is logged in
                    //  and allowed to access this resource."
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If the error status is 401 and there is no originalRequest._retry flag,
                // it means the token has expired and we need to refresh it
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = auth?.refreshToken;

                    try {
                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken } // body
                        );
                        const { accessToken } = response.data;
                        console.log(response.data);

                        console.log(`New Token: ${accessToken}`);
                        setAuth({ ...auth, accessToken });

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    } catch (err) {
                        console.log(err.response?.data?.message);
                    }
                }

                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth?.accessToken]);
    return api;
}
