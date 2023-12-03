import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
    const result = await request.get(baseUrl);
    return result;
};

export const getOne = async (postId) => {
    const result = await request.get(`${baseUrl}/${postId}`,);

    return result;
}

export const getLatestPost = async () => {
    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&offset=0&pageSize=3`);
    return result;
}

export const create = async (postData) => {
    const result = await request.post(baseUrl, postData);
    return result;
};

export const edit = async (postId, postData) => {
    const result = await request.put(`${baseUrl}/${postId}`, postData);

    return result;
};

export const remove = async (postId) => request.remove(`${baseUrl}/${postId}`);

export const search = async (text) => {
    const result = await request.get(`${baseUrl}?where=title%20LIKE%20%22${text}%22%20OR%20category%20LIKE%20%22${text}%22`);
    return result;
}
