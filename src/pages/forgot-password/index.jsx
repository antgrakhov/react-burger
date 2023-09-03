import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../login/login.module.css'

export default function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = React.useState('')
    const handleChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = React.useState('')
    const handleChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const [valueName, setValueName] = React.useState('')

    return <div className={styles.container}>
        <h1 className="text_type_main-medium mb-6">Восстановление пароля</h1>
        <EmailInput
            onChange={handleChangeEmail}
            value={emailValue}
            name={'email'}
            placeholder={'Укажите e-mail'}
            isIcon={false}
            extraClass="mt-6"
        />
        <div className="mt-6">
            <Button htmlType="button" type="primary" size="medium">
                Восстановить
            </Button>
        </div>
        <div className="mt-20">
            <p className={styles.subnav}>
                Вспомнили пароль?
                <NavLink className={styles.link} to="/login"> Войти</NavLink>
            </p>
        </div>
    </div>
}