import React, {Dispatch, FormEvent, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {registerUserAction} from '../../services/actions/user'
import {NavLink} from 'react-router-dom'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useForm} from '../../utils/use-form'
import {ROUTE_LOGIN} from '../../services/routes'
import {userSelector} from '../../services/selectors'

import styles from '../login/login.module.css'

export default function RegisterPage() {
    const dispatch: Dispatch<any> = useDispatch()
    const {
        registerRequest,
        registerFailed,
    } = useSelector(userSelector)

    const {
        form,
        isFormFilled,
        handleChangeForm,
    } = useForm({
        name: '',
        email: '',
        password: '',
    })

    const {
        name,
        email,
        password,
    } = form

    const nameRef = useRef(null)

    const onNameIconClick = () => {
        // @ts-ignore
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch(registerUserAction(form))
    }

    return <form className={styles.container} onSubmit={handleFormSubmit}>
        <h1 className="text_type_main-medium mb-6">Регистрация</h1>

        {registerFailed &&
            <p className="mb-6">К сожалению, зарегистрироваться не удалось</p>
        }

        <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChangeForm}
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
                <NavLink className={styles.link} to={ROUTE_LOGIN}> Войти</NavLink>
            </p>
        </div>
    </form>
}