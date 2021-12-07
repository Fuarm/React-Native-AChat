import { ACCOUNT_ID, APPLICATION_ID, VOX_API_KEY } from "../constants";
import { urlEncode } from "./util";

// Example POST method implementation:
const defaultOptions = {
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    // 'Content-Type': 'application/json'
    // // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}
const authParams = {
    account_id: ACCOUNT_ID,
    application_id: APPLICATION_ID,
    api_key: VOX_API_KEY
}

const baseURL = "https://api.voximplant.com/";

async function request(method = 'GET', url = '', data?: {}) {
    const body = method !== 'GET' && {...authParams, ...data};
    const BodyGet = method === 'GET'
        ? urlEncode({...authParams, ...data})
        : '';
    const options = {
        method,
        ...defaultOptions,
        ...body
    } as RequestInit;
    return await fetch(baseURL + url + BodyGet, options);
}

const Fetch: { [x: string]: (...params: any[]) => Promise<Response> } = {};
['GET','POST'].forEach(method => 
    Fetch[method.toLowerCase()] = (...params) => request(method, ...params)
);

export default Fetch;