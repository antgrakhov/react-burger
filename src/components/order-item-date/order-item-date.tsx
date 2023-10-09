type TOrderItemDate = {
    dateRaw: string
}

export default function OrderItemDate({dateRaw}: TOrderItemDate) {
    const date = new Date(dateRaw)

    return <div className={`text_color_inactive`}>
        {date.toLocaleString()}
    </div>
}