import React, {useEffect, Dispatch, FormEvent} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {useForm} from '../../utils/use-form'
import {updateUserAction} from '../../services/actions/user'
import {userSelector} from '../../services/selectors'

import styles from './profile-user.module.css'

export default function ProfileUser() {
    const {
        user,
        patchUserRequest,
        patchUserFailed,
        logoutFailed,
    } = useSelector(userSelector)
    const dispatch: Dispatch<any> = useDispatch()

    const {
        form,
        setForm,
        isFormChanged,
        setIsFormChanged,
        handleChangeForm,
    } = useForm({
        name: user.name,
        email: user.email,
        password: '',
    })

    const {
        name,
        email,
        password,
    } = form

    const handleResetForm = () => {
        setForm({
            name: user.name,
            email: user.email,
            password: '',
        })
        setIsFormChanged(false)
    }

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()

        dispatch(updateUserAction(form))
    }

    useEffect(() => {
        const newForm = {
            name: form.name,
            email: form.email,
            password: ''
        }

        setIsFormChanged(false)
        setForm(newForm)
    }, [user])

    return <form className={styles.form} onSubmit={handleSubmitForm}>
        <p className={`${styles.descr} text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
        </p>
        <p className="mb-6">
            {patchUserFailed && <>При обновлении данных произошла ошибка</>}
            {logoutFailed && <>При выходе произошла ошибка</>}
        </p>
        <Input
            value={name}
            name={'name'}
            placeholder={'Имя'}
            icon={'EditIcon'}
            onChange={handleChangeForm}
        />
        <EmailInput
            value={email}
            name={'email'}
            placeholder={'Логин'}
            isIcon={true}
            onChange={handleChangeForm}
            extraClass={'mt-6'}
        />
        <PasswordInput
            value={password}
            name={'password'}
            icon={'EditIcon'}
            onChange={handleChangeForm}
            extraClass={'mt-6'}
        />
        <div className={`${styles.panel} mt-6`}>
            <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={handleResetForm}
                disabled={patchUserRequest || !isFormChanged}
            >
                Отмена
            </Button>

            <Button
                htmlType="submit"
                type="primary"
                size="large"
                disabled={patchUserRequest || !isFormChanged}
            >
                Сохранить
            </Button>
        </div>
    </form>
}