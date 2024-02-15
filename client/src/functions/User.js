import * as api from "../api/User";

export const GetUser = async () => {
    try {
        const { data } = await api.GetUser();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const LoginUser = async (user) => {
    try {
        const { data } = await api.LoginUser(user);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const EditUser = async (user) => {
    try {
        const { data } = await api.EditUser(user);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const RegisterUser = async (user) => {
    try {
        const { data } = await api.RegisterUser(user);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const RemoveUser = async (user) => {
    try {
        const { data } = await api.RemoveUser(user);
        return data;
    } catch (error) {
        console.log(error);
    }
}