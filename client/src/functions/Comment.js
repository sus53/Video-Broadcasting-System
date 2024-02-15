import * as api from '../api/Comment'

export const GetComment = async () => {
    try {
        const { data } = await api.GetComment();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const AddComment = async (Comment) => {
    try {
        const { data } = await api.AddComment(Comment);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const RemoveComment = async (Comment) => {
    try {
        const { data } = await api.RemoveComment(Comment);
        return data;
    } catch (error) {
        console.log(error);
    }
}