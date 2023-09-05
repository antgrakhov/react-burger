import {Route, Routes} from 'react-router-dom'
import BurgerConstructorPage from '../pages/burger-constructor'
import Page404 from '../pages/404'
import LoginPage from '../pages/login'
import ProfilePage from '../pages/profile'
import ProfileUser from '../components/profile-user/profile-user'
import {OnlyAuth, OnlyUnAuth} from '../components/protected-route/protected-route'

export default function AppRoutes() {
    return <>
        <Routes>
            <Route path="/" element={<BurgerConstructorPage/>}/>
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>} >
                <Route index element={<ProfileUser/>}/>
            </Route>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    </>
}