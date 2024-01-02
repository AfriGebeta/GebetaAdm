import axios from "axios";

const BASE_URL = "https://mapapi.gebeta.app";
const LOCAL_BASE_URL = "http://localhost:8080"



export const API = axios.create({
  baseURL: BASE_URL,
});





export const handleApiError = async (error) => {
  try {
    const errorMessage = error.response?.data?.message || error.response?.data?.msg || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
