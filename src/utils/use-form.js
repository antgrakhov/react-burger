import React, {useEffect} from 'react'

export const useForm = (initialForm) => {
    const [form, setForm] = React.useState(initialForm)
    const [isFormFilled, setIsFormFilled] = React.useState(false)
    const [isFormChanged, setIsFormChanged] = React.useState(false)

    useEffect(() => {
        setIsFormFilled(!Object.values(form).includes(''))
        setIsFormChanged(
            JSON.stringify(initialForm) !== JSON.stringify(form)
        )
    }, [form, initialForm])

    return {
        form,
        setForm,
        isFormFilled,
        isFormChanged,
        setIsFormChanged,
        handleChangeForm: (event) => {
            const {value, name} = event.target

            setForm({
                ...form,
                [name]: value
            })
        },
    }
}