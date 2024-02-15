import axios from "axios";

const URL = "http://localhost:4000/video";

export const GetVideo = () => axios.get(URL);
export const AddVideo = video => axios.post(`${URL}/add`, video);
export const UploadVideo = video => axios.post(`${URL}/upload`, video);
export const RemoveVideo = id => axios.post(`${URL}/remove`, id);