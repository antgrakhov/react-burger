import React, {useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {registerUserAction} from '../../services/actions/user'
import {NavLink} from 'react-router-dom'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useForm} from '../../utils/use-form'

import styles from '../login/login.module.css'

const initFormData = {
    name: '',
    email: '',
    password: '',
}

export default function RegisterPage() {
    const dispatch = useDispatch()
    const {
        registerRequest,
        registerFailed,
    } = useSelector(store => store.user)

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm(initFormData)

    const {
        name,
        email,
        password,
    } = form

    const nameRef = useRef(null)

    const onNameIconClick = () => {
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        dispatch(registerUserAction(form))
    }

    return <div className={styles.container}>
        <h1 className="text_type_main-medium mb-6">Регистрация</h1>

        {registerFailed &&
            <p className="mb-6">К сожалению, зарегистрироваться не удалось</p>
        }

        <form onSubmit={handleFormSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChangeForm}
                icon={false}
                value={name}
                name={'name'}
                error={false}
                ref={nameRef}
                onIconClick={onNameIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput
                onChange={handleChangeForm}
                value={email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={handleChangeForm}
                value={password}
                name={'password'}
                extraClass="mb-6"
                onError={()=>console.log('xxx')}
            />
            <div className="mt-6">
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={registerRequest || !isFormFilled}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className="mt-20">
                <p className={styles.subnav}>
                    Уже зарегистрированы?
                    <NavLink className={styles.link} to="/login"> Войти</NavLink>
                </p>
            </div>
        </form>
    </div>
}