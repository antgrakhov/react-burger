import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import Loader from '../loader/loader'

const ProtectedRoute = ({onlyUnAuth = false, component}) => {
    const isAuthChecked = useSelector(store => store.user.isAuthChecked)
    const user = useSelector(store => store.user.user)
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
export const OnlyUnAuth = ({component}) => (
    <ProtectedRoute
        onlyUnAuth={true}
        component={component}/>
)
