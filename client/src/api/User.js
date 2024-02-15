import axios from "axios";

const URL = "http://localhost:4000/user";

export const GetUser = () => axios.get(URL);
export const LoginUser = user => axios.post(`${URL}/login`, user);
export const EditUser = user => axios.post(`${URL}/update`, user);
export const RegisterUser = user => axios.post(`${URL}/register`, user);
export const RemoveUser = id => axios.delete(`${URL}/remove/${id}`);