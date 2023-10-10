import React, {FormEvent} from 'react'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import {NavLink} from 'react-router-dom'
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useForm} from '../../utils/use-form'
import {loginUserAction} from '../../services/actions/user'
import {
    ROUTE_FORGOT_PASSWORD,
    ROUTE_REGISTER
} from '../../utils/constants'
import {userSelector} from '../../services/selectors'

import styles from './login.module.css'

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const {
        loginRequest,
        loginFailed,
    } = useAppSelector(userSelector)

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm({
        email: '',
        password: '',
    })

    const {
        email,
        password,
    } = form

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch(loginUserAction(form))
    }

    return <form className={styles.container} onSubmit={handleFormSubmit}>
        <h1 className="text_type_main-medium mb-6">Вход</h1>

        {loginFailed &&
            <p className="mb-6">К сожалению, войти не удалось</p>
        }

        <EmailInput
            onChange={handleChangeForm}
            value={email}
            name={'email'}
            isIcon={false}
        />
        <PasswordInput
            onChange={handleChangeForm}
            value={password}
            name={'password'}
            extraClass="mt-6"
        />
        <div className="mt-6">
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                disabled={loginRequest || !isFormFilled}
            >
                Войти
            </Button>
        </div>

        <div className="mt-20">
            <p className={styles.subnav}>
                Вы — новый пользователь?
                <NavLink className={styles.link} to={ROUTE_REGISTER}> Зарегистрироваться</NavLink>
            </p>
            <p className={styles.subnav}>
                Забыли пароль?
                <NavLink className={styles.link} to={ROUTE_FORGOT_PASSWORD}> Восстановить пароль</NavLink>
            </p>
        </div>
    </form>
}