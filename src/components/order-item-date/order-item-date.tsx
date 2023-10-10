import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'

type TOrderItemDate = {
    dateRaw: string
}

export default function OrderItemDate({dateRaw}: TOrderItemDate) {
    const date = new Date(dateRaw)

    return <div className={`text_color_inactive`}>
        <FormattedDate date={date}/>
    </div>
}