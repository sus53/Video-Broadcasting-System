import * as api from '../api/Watch';

export const GetWatch = async (watch) => {
    try {
        const { data } = await api.GetWatch(watch);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const AddWatch = async (watch) => {
    try {
        const { data } = await api.AddWatch(watch);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const RemoveWatch = async (watch) => {
    try {
        const { data } = await api.RemoveWatch(watch);
        return data;
    } catch (error) {
        console.log(error);
    }
}