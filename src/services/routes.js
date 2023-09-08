import {Route, Routes, useLocation} from 'react-router-dom'
import BurgerConstructorPage from '../pages/burger-constructor'
import Page404 from '../pages/404'
import LoginPage from '../pages/login'
import ProfilePage from '../pages/profile'
import ProfileUser from '../components/profile-user/profile-user'
import RegisterPage from '../pages/register'
import ForgotPasswordPage from '../pages/forgot-password'
import ResetPasswordPage from '../pages/reset-password'
import IngredientDetailsPage from '../pages/ingredient-details'
import IngredientDetailsModal from '../components/ingredient-details-modal/ingredient-details-modal'
import {OnlyAuth, OnlyUnAuth} from '../components/protected-route/protected-route'

const ROUTE_INDEX = '/'
const ROUTE_LOGIN = '/login'
const ROUTE_REGISTER = '/register'
const ROUTE_FORGOT_PASSWORD = '/forgot-password'
const ROUTE_RESET_PASSWORD = '/reset-password'
const ROUTE_PROFILE = '/profile'
const ROUTE_PROFILE_ORDERS = 'orders'
const ROUTE_INGREDIENTS = '/ingredients'

export {
    ROUTE_INDEX,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_FORGOT_PASSWORD,
    ROUTE_RESET_PASSWORD,
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
    ROUTE_INGREDIENTS,
}

export default function AppRoutes() {
    const location = useLocation()
    const background = location.state?.background

    return <>
        <Routes location={background || location}>
            <Route path={ROUTE_INDEX} element={<BurgerConstructorPage/>}/>
            <Route path={ROUTE_LOGIN} element={<OnlyUnAuth component={<LoginPage/>}/>}/>
            <Route path={ROUTE_REGISTER} element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
            <Route path={ROUTE_FORGOT_PASSWORD} element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>}/>
            <Route path={ROUTE_RESET_PASSWORD} element={<OnlyUnAuth component={<ResetPasswordPage/>}/>}/>
            <Route path={ROUTE_PROFILE} element={<OnlyAuth component={<ProfilePage/>}/>} >
                <Route index element={<ProfileUser/>}/>
                <Route path={ROUTE_PROFILE_ORDERS} element={<p>Orders List</p>}/>
            </Route>
            <Route path={`${ROUTE_INGREDIENTS}/:id`} element={<IngredientDetailsPage/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>

        {background &&
            <Routes>
                <Route path={`${ROUTE_INGREDIENTS}/:id`} element={<IngredientDetailsModal/>}/>
            </Routes>
        }
    </>
}