import ErrorMessage from '../../components/error-message/error-message'

export default function Page404() {
    return <ErrorMessage
        title={`Ошибка 404. Ничего не найдено`}
        message={`К сожалению, по этому адресу ничего нет.`}
    />
}