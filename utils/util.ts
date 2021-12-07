export const urlEncode = function(params: {[K: string]: string | number}) {
    let paramGet = '';
    for(const key in params) {
        paramGet += `&${key}=${params[key]}`;
    }
    return paramGet.replace(/&/, "?");
};