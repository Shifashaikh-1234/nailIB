import axios from 'axios'


const api = axios.create({
baseURL: import.meta.env.REACT_APP_API_URL || 'https://nailib-backend-url.onrender.com',
headers: { 'Content-Type': 'application/json' },
})


export default api