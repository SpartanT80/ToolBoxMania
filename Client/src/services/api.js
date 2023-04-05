import axios from "axios";



async function getUserAuth(url, TOKEN){
    try{
        return await axios.get(url, {headers: {"x-access-token" : TOKEN}});
    } catch(error) {
        return error
    }
    // const response = await (await fetch(url)).json();
    // return response;
}

async function getDatas(url){
    try{
        return await axios.get(url);
    } catch(error) {
        throw new Error(error)
    }
}

async function deleteDatas(url, id){
    try {
        return await axios.delete(url, {datas:{id}});
    } catch (error) {
        throw new Error(error)
    }
}
async function addDatas(url, datas){
    try {
        return await axios.post(url, datas);
    } catch (error) {
        throw new Error(error)
    }
}
async function updateDatas(url, datas){
    try {
        return await axios.put(url, datas);
    } catch (error) {
        throw new Error(error)
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

export {getUserAuth, getDatas, deleteDatas, addDatas, updateDatas, signup, signin};