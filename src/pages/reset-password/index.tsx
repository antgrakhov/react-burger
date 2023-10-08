import React, {Dispatch, FormEvent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useForm} from '../../utils/use-form'
import {resetPasswordAction} from '../../services/actions/reset-password'
import {ROUTE_LOGIN} from '../../utils/constants'
import {resetPasswordSelector} from '../../services/selectors'

import styles from '../login/login.module.css'

export default function ResetPasswordPage() {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        resetPasswordRequest,
        resetPasswordFailed,
    } = useSelector(resetPasswordSelector)

    const [resultSuccess, setResultSuccess] = React.useState(false)

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm({
        password: '',
        token: '',
    })

    const {
        password,
        token,
    } = form

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        (dispatch(resetPasswordAction(password, token)) as any)
            .then(() => {
                setResultSuccess(true)
            })
            .catch((err: string) => {
                console.log(err)
                setResultSuccess(false)
            })
    }

    useEffect(() => {
        if (!location.state || !location.state.resetPassword) {
            navigate('/forgot-password')
        }

    }, [location.state, navigate])

    return <form className={styles.container} onSubmit={handleFormSubmit}>
        <h1 className="text_type_main-medium mb-6">
            Восстановление пароля
        </h1>

        <p className="mb-6">
            {resetPasswordFailed && <>К сожалению, изменить пароль не удалось</>}
            {resultSuccess && <>Пароль успешно изменен</>}
        </p>

        <PasswordInput
            onChange={handleChangeForm}
            value={password}
            name={'password'}
            placeholder={'Введите новый пароль'}
            extraClass="mt-6"
        />
        <Input
            onChange={handleChangeForm}
            value={token}
            name={'token'}
            placeholder={'Введите код из письма'}
            extraClass="mt-6"
        />
        <div className="mt-6">
            <Button
                htmlType="submit"
                type="primary"
                size="medium"
                disabled={resetPasswordRequest || !isFormFilled}
            >
                Сохранить
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