import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptores de requisição
// api.interceptors.request.use(
//   (config) => {
//     // Adicione token de autenticação, se necessário
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Interceptores de resposta
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Trata erros globais, como 401 (não autorizado)
//     if (error.response?.status === 401) {
//       console.error('Usuário não autorizado.');
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
