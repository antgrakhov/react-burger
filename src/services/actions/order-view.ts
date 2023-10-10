import {loadOrder} from '../../utils/api'
import {TAppThunk} from '../../types/store'
import {TOrderData} from '../../types'

const GET_ORDER_VIEW_REQUEST = 'ORDER_VIEW/GET_REQUEST'
const GET_ORDER_VIEW_SUCCESS = 'ORDER_VIEW/GET_SUCCESS'
const GET_ORDER_VIEW_FAILED = 'ORDER_VIEW/GET_FAILED'

type TGetOrderViewRequest = {
    type: typeof GET_ORDER_VIEW_REQUEST
}

type TGetOrderViewSuccess = {
    type: typeof GET_ORDER_VIEW_SUCCESS
    payload: TOrderData[]
}

type TGetOrderViewFailed = {
    type: typeof GET_ORDER_VIEW_FAILED
}

type TGetOrderViewActions = TGetOrderViewRequest
    | TGetOrderViewSuccess
    | TGetOrderViewFailed

const getOrder: TAppThunk = (id: string) => {
    return async function (dispatch) {
        dispatch({
            type: GET_ORDER_VIEW_REQUEST
        })

        loadOrder(id)
            .then(result => {
                if (result.orders.length > 0) {
                    dispatch({
                        type: GET_ORDER_VIEW_SUCCESS,
                        payload: result.orders
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_VIEW_FAILED
                    })
                }
            })
            .catch(() => {
                dispatch({
                    type: GET_ORDER_VIEW_FAILED
                })
            })
    }
}

export {
    GET_ORDER_VIEW_REQUEST,
    GET_ORDER_VIEW_SUCCESS,
    GET_ORDER_VIEW_FAILED,
    getOrder,
    type TGetOrderViewActions,
    type TGetOrderViewRequest,
    type TGetOrderViewSuccess,
    type TGetOrderViewFailed,
}