function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TCookieProps = {
    expires?: number | string | Date
    path?: string
    [propKey: string]: any
}

function setCookie(name: string, value: string, props: TCookieProps) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name: string) {
    setCookie(name, '', {path: '/', expires: -1});
}

function saveTokens(accessToken: string, refreshToken: string) {
    setCookie('accessToken', accessToken, {path: '/'})

    localStorage.setItem('refreshToken', refreshToken)
}

export {
    getCookie,
    setCookie,
    saveTokens,
    deleteCookie,
}