import axios from "axios";

async function getUserAuth(url, TOKEN){
    try{
        return await axios.get(url, {headers: {"x-access-token" : TOKEN}});
    } catch(error) {
        return error
    }
}

async function getDatas(url){
    try{
        return await axios.get(url);
    } catch(error) {
        throw new Error(error)
    }
}

async function getUserById(url, id) {
    try {
        return await axios.get(url, { params: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteDatas(url, id) {
    try {
        const TOKEN = localStorage.getItem('auth');
        return await axios.delete(url, { data: { id }, headers: { "x-access-token": TOKEN } });
    } catch (error) {
        throw new Error(error)
    }
}
async function addDatas(url, datas) {
    try {
        const TOKEN = localStorage.getItem('auth');
        return await axios.post(url, datas, { headers: { "x-access-token": TOKEN } });
    } catch (error) {
        throw new Error(error)
    }
}
async function updateDatas(url, datas) {
    try {
        const TOKEN = localStorage.getItem('auth');
        const response = await axios.put(url, datas, { headers: { "x-access-token": TOKEN } });
        return response;
    } catch (error) {
        console.error('Update Error:', error);
        throw new Error(error);
    }
}

async function signup (datas) {
    try {
        return await axios.post("/user/signup", datas);
    } catch (error) {
        throw new Error(error);
    }
}
async function signin (datas) {
    try {
        return await axios.post("/user/signin", datas);
    } catch (error) {
        throw new Error(error);
    }
}

export {getUserAuth, getDatas, getUserById, deleteDatas, addDatas, updateDatas, signup, signin};