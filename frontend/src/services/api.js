import axios from 'axios';


const api = axios.create({
baseURL: import.meta.env.VITE_API_URL,
timeout: 8000, // fast fail
});


// Attach token automatically
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


// Optional: global response handler
api.interceptors.response.use(
(res) => res,
(err) => {
if (err.response && err.response.status === 401) {
// simple handling: remove token and reload
localStorage.removeItem('token');
// you can emit an event or use a pub/sub to notify the app
}
return Promise.reject(err);
}
);


export default api;