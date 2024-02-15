import axios from "axios";

const URL = "http://localhost:4000/comment";

export const GetComment = () => axios.get(URL);
export const AddComment = Comment => axios.post(`${URL}/add`, Comment);
export const RemoveComment = id => axios.delete(`${URL}/remove/${id}`);