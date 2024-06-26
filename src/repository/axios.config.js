import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timed out...",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
})

// component ===> serviceRepo ==> axiosConfig ===> Intercept ===> network 
// Nework ===> axiosConfig ===> intercept ===> ServiceRepo ===> Component

axiosInstance.interceptors.response.use(
    (response) => {
        // 200
        return response.data;
    },
    (error) => {
        // error handling 
        // 4X
        //  400, 422, 
        // 401, 403, 404
        if(error.response.status === 401) {
            // TODO: clear 
            // TODO: redirect to login screen
            // refresh token ===> Refresh token 
            // token local 
            // refresh token ===> 
                // access token ===> existing token update
                // user role redirect 
                // exception ===> localStorage.clear()
                    // login redirect
        }
        throw error.response.data
    }
)

export default axiosInstance