/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { logout } from "../store/authSlice";

let bearer = '';
let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
function postHeader(params: any) {
    bearer = bearer ? bearer : 'Bearer ' + getCookie('token');
    let header: any = {
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            Authorization: bearer,
            'Content-Type': 'application/json',
        },
        body: params && params.formData ? params.formData : JSON.stringify(params),
    };

    if (params && params.formData) {
        delete header.headers['Content-Type']
    }
    return header;
}

export function getCookie(cname: string) {
    let results = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : '';
}

export function setCookie(cname: string, cvalue: string, cday: number) {
    let exdays = cday ? cday : 100; //60;
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + encodeURIComponent(cvalue) + ';' + expires + ';path=/';
}

function getHeader() {
    bearer = bearer ? bearer : 'Bearer ' + getCookie('token');
    return {
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            Authorization: bearer,
            'Content-Type': 'application/json',
        },
    };
}

function withQuery(parameters: any) {
    let qs = '';
    if (!parameters) return qs;
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            if (value !== undefined && value !== null)
                qs +=
                    encodeURIComponent(key) +
                    '=' +
                    (typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : encodeURIComponent(value)) +
                    '&';
        }
    }

    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
    }

    return qs;
}

function redirectAuth() {
    setCookie('token', '', 1);
    bearer = ''
}

function getDeepParam(obj: any) {
    function iter(o: string, path: string) {
        if (Array.isArray(o)) {
            o.forEach(function (a, i) {
                iter(a, path + '[' + i + ']');
            });
            return;
        }
        if (o !== null && typeof o === 'object') {
            Object.keys(o).forEach(function (k) {
                iter(o[k], path + '[' + k + ']');
            });
            return;
        }
        data[path] = o;
    }

    let data: any = {};
    Object.keys(obj).forEach(function (k) {
        iter(obj[k], k);
    });
    return data;
}

export async function request(action: string, option: any) {
    // custom filters
    if (option.params.filters) {
        const filters = option.params.filters;
        const tmpFilters = getDeepParam({ filters: filters });
        delete option.params.filters;
        option.params = { ...option.params, ...tmpFilters };
    }

    // custom sort
    if (option.params.sorts) {
        const sorts = option.params.sorts;
        const tmpSorts = getDeepParam({ sorts: sorts });
        delete option.params.sorts;
        option.params = { ...option.params, ...tmpSorts };
    }

    const pipeInfo = {
        action: action,
        method: option.method,
        params: option.params,
    };

    let header, uri;
    if (pipeInfo.method == 'POST' || pipeInfo.method == 'PUT' || pipeInfo.method == 'DELETE') {
        header = postHeader(pipeInfo.params);

        uri = option.uri ? option.uri : apiBaseUrl;
        uri = uri + pipeInfo.action;
    } else {
        header = getHeader();

        uri = option.uri ? option.uri : apiBaseUrl;
        uri = uri + pipeInfo.action + '?' + withQuery(pipeInfo.params);
    }

    // assign method
    header.method = pipeInfo.method;
    //fetch
    try {
        let res = await fetch(uri, header);

        let data = await res.json();

        if (option?.ignoreAuth !== true && data.statusCode == 401) {
            redirectAuth();
        }

        return data;
    } catch (error) {
        Promise.reject({ statusCode: -9999, data: 'UnknownError: ' + error });
    }
}


export async function auth(username: string, password: string) {
    const option = {
        method: 'POST',
        params: {
            userName: username,
            password: password,
        },
    };
    let res = await request('/auth/get-token', option);
    if (res.statusCode == 200 && res.data) {
        bearer = 'Bearer ' + res.data;
        setCookie('token', res.data, 3)
    }
    return res;
}

export async function getMe() {
    const option = {
        method: 'GET',
        params: {},
    };

    let res = await request('/users/me', option);
    return res;
}
export async function register(
    username: string,
    password: string,
    confirmPassword: string,
    name: string,
) {
    const option = {
        method: 'POST',
        params: {
            username,
            password,
            confirmPassword,
            name,
        },
    };

    let res = await request('/auth/register', option);
    if (res.statusCode == 200 && res.data) {
        bearer = 'Bearer ' + res.data;
        setCookie('token', res.data, 3)
    }
    return res;
}

export async function getShopItem(
    currentPage = 1,
    filters = {}
) {
    const res = await request('/shop/get-item-list', {
        method: 'GET',
        params: {
            limit: 9,
            page: currentPage - 1,
            filters: Object.assign({}, filters),
            sorts: [{ sortKey: 'createdAt', sortValue: 'DESC' }],
        },
    })
    return res;

}