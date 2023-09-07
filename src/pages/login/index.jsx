import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useForm} from '../../utils/use-form'
import {loginUserAction} from '../../services/actions/user'

import styles from './login.module.css'

const initFormData = {
    email: '',
    password: '',
}

export default function LoginPage() {
    const dispatch = useDispatch()
    const {
        loginRequest,
        loginFailed,
    } = useSelector(store => store.user)

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm(initFormData)

    const {
        email,
        password,
    } = form

    const handleFormSubmit = (e) => {
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
                <NavLink className={styles.link} to="/register"> Зарегистрироваться</NavLink>
            </p>
            <p className={styles.subnav}>
                Забыли пароль?
                <NavLink className={styles.link} to="/forgot-password"> Восстановить пароль</NavLink>
            </p>
        </div>
    </form>
}