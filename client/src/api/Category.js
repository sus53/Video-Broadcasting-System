import axios from "axios";

const URL = "http://localhost:4000/category";

export const GetCategory = () => axios.get(URL + '/');

export const AddCategory = (category) => axios.post(URL + '/add', category);

export const UpdateCategory = (category) => axios.post(URL + '/update', category);

export const UploadImage = image => axios.post(`${URL}/upload`, image);

export const RemoveCategory = (category) => axios.post(URL + '/remove', category);
