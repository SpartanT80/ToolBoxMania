
const saveToLocalStorage = (key, datas) => {
    localStorage.setItem(key, JSON.stringify(datas));
    return datas;
}

export {saveToLocalStorage};