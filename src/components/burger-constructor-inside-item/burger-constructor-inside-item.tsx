import React from 'react'
import {Identifier} from 'dnd-core'
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from 'react-dnd'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {
    moveConstructorInsideItem,
    removeConstructorInsideItem
} from '../../services/actions/constructor'
import {useAppDispatch} from '../../utils/store'
import {TIngredientUnique} from '../../types'

import styles from './burger-constructor-inside-item.module.css'

type TBurgerConstructorInsideItem = {
    index: number
    ingredient: TIngredientUnique
}

type TDragItem = {
    id: string
    index: number
}

export default function BurgerConstructorInsideItem({index, ingredient}: TBurgerConstructorInsideItem) {
    const acceptType = 'ingredient'
    const ref = React.useRef<HTMLLIElement>(null)
    const dispatch = useAppDispatch()

    const [{isDragging}, dragRef] = useDrag({
        type: acceptType,
        item: (): TDragItem => {
            return {
                id: ingredient.uniqueId,
                index
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{handlerId}, dropRef] = useDrop<TDragItem, void, {handlerId: Identifier | null}>({
        accept: acceptType,
        collect(monitor: DropTargetMonitor<TDragItem, void>) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: TDragItem, monitor) {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveConstructorInsideItem(
                dragIndex +1,
                hoverIndex +1
            ))

            item.index = hoverIndex
        },
    })

    dragRef(dropRef(ref))

    function handleRemoveInsideItem(id: string, uniqueId: string) {
        dispatch(removeConstructorInsideItem(id, uniqueId))
    }

    return <li
        ref={ref}
        className={styles.item}
        style={{opacity: isDragging ? 0 : 1}}
        data-handler-id={handlerId}
    >
        <button className={styles.dragger}>
            <DragIcon type="primary"/>
        </button>
        <ConstructorElement
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
