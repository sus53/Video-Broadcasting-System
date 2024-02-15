import axios from "axios";

const URL = "http://localhost:4000/watch";

export const GetWatch = (watch) => axios.post(URL, watch);
export const AddWatch = (watch) => axios.post(URL + "/add", watch);
export const RemoveWatch = (watch) => axios.delete(`${URL}/delete/` + watch);