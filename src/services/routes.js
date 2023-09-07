import {Route, Routes} from 'react-router-dom'
import BurgerConstructorPage from '../pages/burger-constructor'
import Page404 from '../pages/404'
import LoginPage from '../pages/login'
import ProfilePage from '../pages/profile'
import ProfileUser from '../components/profile-user/profile-user'
import RegisterPage from '../pages/register'
import ForgotPasswordPage from '../pages/forgot-password'
import ResetPasswordPage from '../pages/reset-password'
import {OnlyAuth, OnlyUnAuth} from '../components/protected-route/protected-route'

export default function AppRoutes() {
    return <>
        <Routes>
            <Route path="/" element={<BurgerConstructorPage/>}/>
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>}/>
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>}/>}/>
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>} >
                <Route index element={<ProfileUser/>}/>
            </Route>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    </>
}