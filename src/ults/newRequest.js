import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://datn-yke9.onrender.com/api",
  withCredentials : true
});

export default newRequest;
