import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {forgotPasswordAction} from '../../services/actions/reset-password'
import {useForm} from '../../utils/use-form'
import {ROUTE_LOGIN} from '../../services/routes'

import styles from '../login/login.module.css'

export default function ForgotPasswordPage() {
    const dispatch = useDispatch()
    const {
        forgotPasswordRequest,
        forgotPasswordFailed,
    } = useSelector(store => store.resetPassword)

    const navigate = useNavigate()

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm({
        email: '',
    })

    const {email} = form

    const handleFormSubmit = (event) => {
        event.preventDefault()

        dispatch(forgotPasswordAction(email))
            .then(() => {
                navigate('/reset-password', {
                    state: {
                        resetPassword: true,
                    }
                })
            })
            .catch((err) => console.log(err))
    }

    return <form className={styles.container} onSubmit={handleFormSubmit}>
        <h1 className="text_type_main-medium mb-6">Восстановление пароля</h1>

        {forgotPasswordFailed &&
            <p className="mb-6">К сожалению, cбросить пароль не удалось</p>
        }

        <EmailInput
            onChange={handleChangeForm}
            value={email}
            name={'email'}
            placeholder={'Укажите e-mail'}
            extraClass="mt-6"
        />
        <div className="mt-6">
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                disabled={forgotPasswordRequest || !isFormFilled}
            >
                Восстановить
            </Button>
        </div>

        <div className="mt-20">
            <p className={styles.subnav}>
                Вспомнили пароль?
                <NavLink className={styles.link} to={ROUTE_LOGIN}> Войти</NavLink>
            </p>
        </div>
    </form>
}