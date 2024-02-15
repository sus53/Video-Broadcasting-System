import * as api from '../api/Video';

export const GetVideo = async () => {
    try {
        const { data } = await api.GetVideo();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const AddVideo = async (video) => {
    try {
        const { data } = await api.AddVideo(video);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const UploadVideo = async (video) => {
    try {
        const { data } = await api.UploadVideo(video);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const RemoveVideo = async (id) => {
    try {
        const { data } = await api.RemoveVideo(id);
        return data;
    } catch (error) {
        console.log(error);
    }
}