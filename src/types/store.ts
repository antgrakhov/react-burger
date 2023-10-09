import {ActionCreator} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {rootReducer} from '../services/reducers'
import {TConstructorActions} from '../services/actions/constructor'
import {TIngredientsActions} from '../services/actions/ingredients'
import {TFeedOrdersActions} from '../services/actions/feed-orders'
import {THistoryOrdersActions} from '../services/actions/history-orders'
import {TSendOrderActions} from '../services/actions/order'
import {TResetForgotPasswordActions} from '../services/actions/reset-password'
import {TUserActions} from '../services/actions/user'

type RootState = ReturnType<typeof rootReducer>

type TAppActions = TConstructorActions
    | TIngredientsActions
    | TFeedOrdersActions
    | THistoryOrdersActions
    | TSendOrderActions
    | TResetForgotPasswordActions
    | TUserActions

type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<Promise<TReturn>, RootState, never, TAppActions>>

type TAppDispatch = ThunkDispatch<RootState, never, TAppActions>

export {
    type RootState,
    type TAppThunk,
    type TAppDispatch,
}