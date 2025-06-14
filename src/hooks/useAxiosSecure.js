import axios from "axios";
import { useEffect } from "react";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: 'https://server-site-sigma-ashy.vercel.app', 
});

const useAxiosSecure = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  (user) => {
      if (user.email) {
        axiosSecure.interceptors.request.use(
          async (config) => {
            const token = await getIdToken(user);
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error) => Promise.reject(error)
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
