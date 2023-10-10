const DOMAIN = 'norma.nomoreparties.space'
const HTTP_API_URL = `https://${DOMAIN}/api`
const WS_API_URL = `wss://${DOMAIN}`
const PATH_WS_API_ORDERS_ALL = `${WS_API_URL}/orders/all`
const PATH_WS_API_PROFILE_ORDERS = `${WS_API_URL}/orders`

const PATH_API_INGREDIENTS = '/ingredients'
const PATH_API_ORDERS = '/orders'
const PATH_API_AUTH_REGISTER = '/auth/register'
const PATH_API_AUTH_LOGIN = '/auth/login'
const PATH_API_AUTH_USER = '/auth/user'
const PATH_API_AUTH_LOGOUT = '/auth/logout'
const PATH_API_PASSWORD_FORGOT = '/password-reset'
const PATH_API_PASSWORD_RESET = '/password-reset/reset'
const PATH_API_AUTH_TOKEN = '/auth/token'

const ROUTE_INDEX = '/'
const ROUTE_LOGIN = '/login'
const ROUTE_REGISTER = '/register'
const ROUTE_FORGOT_PASSWORD = '/forgot-password'
const ROUTE_RESET_PASSWORD = '/reset-password'
const ROUTE_PROFILE = '/profile'
const ROUTE_PROFILE_ORDERS = 'orders'
const ROUTE_INGREDIENTS = '/ingredients'
const ROUTE_FEED = '/feed'

export {
    HTTP_API_URL,
    WS_API_URL,
    PATH_WS_API_ORDERS_ALL,
    PATH_WS_API_PROFILE_ORDERS,
    PATH_API_INGREDIENTS,
    PATH_API_ORDERS,
    PATH_API_AUTH_REGISTER,
    PATH_API_AUTH_LOGIN,
    PATH_API_AUTH_USER,
    PATH_API_AUTH_LOGOUT,
    PATH_API_PASSWORD_FORGOT,
    PATH_API_PASSWORD_RESET,
    PATH_API_AUTH_TOKEN,
    ROUTE_INDEX,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_FORGOT_PASSWORD,
    ROUTE_RESET_PASSWORD,
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
    ROUTE_INGREDIENTS,
    ROUTE_FEED,
}