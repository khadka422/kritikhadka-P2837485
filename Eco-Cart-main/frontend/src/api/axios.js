// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
// });

// // Add token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("Adding token to request:", token ? "Yes" : "No");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Handle response errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.status, error.response?.data);

//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000, // optional timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Skip auth header for public routes
    const publicRoutes = ["/login", "/register"];
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));

    if (!isPublic) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Adding token to request");
      } else {
        console.log("No token to add");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    console.error("API Error:", status, error.response?.data);

    // Only handle 401 for protected routes
    const publicRoutes = ["/login", "/register"];
    const isPublic = publicRoutes.some((route) => url.includes(route));

    if (status === 401 && !isPublic) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
