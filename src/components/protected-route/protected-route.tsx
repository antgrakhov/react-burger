import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import Loader from '../loader/loader'
import {userSelector} from '../../services/selectors'

type TProtectedRoute = {
    onlyUnAuth?: boolean,
    component: any
}

const ProtectedRoute = ({onlyUnAuth = false, component}: TProtectedRoute) => {
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

    return component
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({component}: any) => (
    <ProtectedRoute
        onlyUnAuth={true}
        component={component}/>
)
