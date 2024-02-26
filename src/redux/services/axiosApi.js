import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
export const apiInstance = axios.create({
  baseURL: baseUrl,
});
