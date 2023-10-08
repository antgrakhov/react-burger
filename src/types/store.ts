import {ActionCreator} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {rootReducer} from '../services/reducers'
import {TFeedOrdersActions} from '../services/actions/feed-orders'

type RootState = ReturnType<typeof rootReducer>

type TAppActions = TFeedOrdersActions

type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<Promise<TReturn>, RootState, never, TAppActions>>

type TAppDispatch = ThunkDispatch<RootState, never, TAppActions>

export {
    type RootState,
    type TAppThunk,
    type TAppDispatch,
}