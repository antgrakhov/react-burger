import React from 'react'
import {useDispatch} from 'react-redux'
import {useDrag, useDrop} from 'react-dnd'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {MOVE_CONSTRUCTOR_INSIDE_ITEM, REMOVE_CONSTRUCTOR_INSIDE_ITEM} from '../../services/actions/constructor'

import styles from './burger-constructor-inside-item.module.css'

export default function BurgerConstructorInsideItem({index, ingredient}) {
    const acceptType = 'ingredient'
    const ref = React.useRef(null)
    const dispatch = useDispatch()

    const [{ isDragging }, dragRef] = useDrag({
        type: acceptType,
        item: () => {
            return {
                id: ingredient.id,
                index
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ handlerId }, dropRef] = useDrop({
        accept: acceptType,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch({
                type: MOVE_CONSTRUCTOR_INSIDE_ITEM,
                dragIndex,
                hoverIndex
            })

            item.index = hoverIndex
        },
    })

    const opacity = isDragging ? 0 : 1

    dragRef(dropRef(ref))

    function handleRemoveInsideItem(id, uniqueId) {
        dispatch({
            id,
            uniqueId,
            type: REMOVE_CONSTRUCTOR_INSIDE_ITEM
        })
    }

    return <li
        ref={ref}
        className={styles.item}
        style={{opacity}}
        data-handler-id={handlerId}
    >
        <button className={styles.dragger}>
            <DragIcon type="primary"/>
        </button>
        <ConstructorElement
            item={ingredient}
            text={ingredient.name}
            thumbnail={ingredient.image}
            price={ingredient.price}
            handleClose={()=> handleRemoveInsideItem(
                ingredient._id,
                ingredient.uniqueId
            )}
        />
    </li>
}