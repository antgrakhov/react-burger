import React, {useEffect} from 'react'

export const useForm = (initialForm) => {
    const [form, setForm] = React.useState(initialForm)
    const [isFormFilled, setIsFormFilled] = React.useState(false)

    useEffect(() => {
        setIsFormFilled(!Object.values(form).includes(''))
    }, [form])

    return {
        form,
        setForm,
        isFormFilled,
        handleChangeForm: (event) => {
            const { value, name } = event.target

            setForm({
                ...form,
                [name]: value
            })
        },
    }
}