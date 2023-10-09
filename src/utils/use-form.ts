import {useState, useEffect, ChangeEvent} from 'react'

type TUseForm = {
    [key: string]: string
}

const useForm = (initialForm: TUseForm) => {
    const [form, setForm] = useState<TUseForm>(initialForm)
    const [isFormFilled, setIsFormFilled] = useState(false)
    const [isFormChanged, setIsFormChanged] = useState(false)

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
        handleChangeForm: (event: ChangeEvent<HTMLInputElement>) => {
            const {
                value,
                name
            } = event.target

            setForm({
                ...form,
                [name]: value
            })
        },
    }
}

export {
    useForm,
    type TUseForm
}