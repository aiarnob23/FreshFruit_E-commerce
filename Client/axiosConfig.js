import axios from "axios";

 const axiosInstance = axios.create(
    {
        baseURL:'https://server-sand-eta.vercel.app',
    }
)

export default axiosInstance;