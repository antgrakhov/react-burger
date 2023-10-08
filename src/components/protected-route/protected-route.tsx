import {FC, PropsWithChildren} from 'react'
import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import Loader from '../loader/loader'
import {userSelector} from '../../services/selectors'

type TProtectedRoute = {
    onlyUnAuth?: boolean
}

const ProtectedRoute: FC<PropsWithChildren<TProtectedRoute>> = ({onlyUnAuth = false, children}) => {
    const {
        isAuthChecked,
        user
    } = useSelector(userSelector)
    const location = useLocation()

    if (!isAuthChecked) {
        return <Loader/>
    }

    if (onlyUnAuth && user.isLogged) {
        const {from} = location.state || {from: {pathname: '/'}}
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user.isLogged) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return <>
        {children}
    </>
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth: FC<PropsWithChildren> = ({children}) => (
    <ProtectedRoute onlyUnAuth={true}>
        {children}
    </ProtectedRoute>
)
