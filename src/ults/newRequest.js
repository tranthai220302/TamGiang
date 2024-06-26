import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://www.harumi.site/api",
  withCredentials : true
});

export default newRequest;
