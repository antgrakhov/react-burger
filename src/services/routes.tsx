import {Route, Routes, useLocation} from 'react-router-dom'
import BurgerConstructorPage from '../pages/burger-constructor'
import IngredientDetails from '../components/ingredient-details/ingredient-details'
import Page404 from '../pages/404'
import LoginPage from '../pages/login'
import ProfilePage from '../pages/profile'
import ProfileUser from '../components/profile-user/profile-user'
import ProfileOrders from '../components/profile-orders/profile-orders'
import RegisterPage from '../pages/register'
import ForgotPasswordPage from '../pages/forgot-password'
import ResetPasswordPage from '../pages/reset-password'
import FeedPage from '../pages/feed'
import OrderDetailsPage from '../pages/order-details'
import PageInModal from '../components/page-in-modal/page-in-modal'
import {OnlyAuth, OnlyUnAuth} from '../components/protected-route/protected-route'
import {
    ROUTE_FEED,
    ROUTE_FORGOT_PASSWORD,
    ROUTE_INDEX,
    ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
    ROUTE_REGISTER,
    ROUTE_RESET_PASSWORD
} from '../utils/constants'

export default function AppRoutes() {
    const location = useLocation()
    const background = location.state?.background

    return <>
        <Routes location={background || location}>
            <Route path={ROUTE_INDEX} element={<BurgerConstructorPage/>}/>
            <Route path={ROUTE_LOGIN} element={<OnlyUnAuth><LoginPage/></OnlyUnAuth>}/>
            <Route path={ROUTE_REGISTER} element={<OnlyUnAuth><RegisterPage/></OnlyUnAuth>}/>
            <Route path={ROUTE_FORGOT_PASSWORD} element={<OnlyUnAuth><ForgotPasswordPage/></OnlyUnAuth>}/>
            <Route path={ROUTE_RESET_PASSWORD} element={<OnlyUnAuth><ResetPasswordPage/></OnlyUnAuth>}/>
            <Route path={ROUTE_PROFILE} element={<OnlyAuth><ProfilePage/></OnlyAuth>} >
                <Route index element={<ProfileUser/>}/>
                <Route path={ROUTE_PROFILE_ORDERS} element={<ProfileOrders/>}/>
            </Route>
            <Route path={`${ROUTE_PROFILE}/${ROUTE_PROFILE_ORDERS}/:id`} element={<OnlyAuth><OrderDetailsPage/></OnlyAuth>}/>
            <Route path={`${ROUTE_INGREDIENTS}/:id`} element={<IngredientDetails/>}/>
            <Route path={ROUTE_FEED} element={<FeedPage/>}/>
            <Route path={`${ROUTE_FEED}/:id`} element={<OrderDetailsPage/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>

        {background &&
            <Routes>
                <Route path={`${ROUTE_INGREDIENTS}/:id`} element={<PageInModal label="Детали ингредиента"><IngredientDetails embed/></PageInModal>}/>
                <Route path={`${ROUTE_PROFILE}/${ROUTE_PROFILE_ORDERS}/:id`} element={<OnlyAuth><PageInModal><OrderDetailsPage embed/></PageInModal></OnlyAuth>}/>
                <Route path={`${ROUTE_FEED}/:id`} element={<PageInModal><OrderDetailsPage embed/></PageInModal>}/>
            </Routes>
        }
    </>
}