import axios from "axios"

// env variable
import { BASE_URL } from "./env"

// configure default axios instance
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

export default axios
