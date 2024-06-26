import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://www.harumi.store/api",
  withCredentials : true
});

export default newRequest;
