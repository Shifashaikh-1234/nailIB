import axios from 'axios'


const api = axios.create({
baseURL: "https://nailib-backend-url.onrender.com/api",

headers: { 'Content-Type': 'application/json' },
})


export default api