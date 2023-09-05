import React from 'react'
import {Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './profile-user.module.css'

export default function ProfileUser() {
    const [name, setName] = React.useState('My name is...')
    const [login, setLogin] = React.useState('my login is...')
    const [password, setPassword] = React.useState('')

    return <div className={styles.form}>
        <Input
            value={name}
            name={'my-name'}
            placeholder={'Имя'}
            onChange={(e)=>setName(e.target.value)}
        />
        <Input
            value={login}
            name={'my-login'}
            placeholder={'Логин'}
            onChange={(e)=>setLogin(e.target.value)}
            extraClass={'mt-6'}
        />
        <PasswordInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name={'my-password'}
            extraClass={'mt-6'}
        />
    </div>
}