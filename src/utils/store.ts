import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'
import {TAppDispatch, RootState} from '../types/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<TAppDispatch>()

export {
    useAppSelector,
    useAppDispatch,
}
