import * as api from '../api/Category'

export const GetCategory = async () => {
    try {
        const { data } = await api.GetCategory();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const AddCategory = async (category) => {
    try {
        const { data } = await api.AddCategory(category);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const UpdateCategory = async (category) => {
    try {
        const { data } = await api.UpdateCategory(category);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const UploadImage = async (category) => {
    try {
        const { data } = await api.UploadImage(category);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const RemoveCategory = async (category) => {
    try {
        const { data } = await api.RemoveCategory(category);
        return data;
    } catch (error) {
        console.log(error);
    }
}