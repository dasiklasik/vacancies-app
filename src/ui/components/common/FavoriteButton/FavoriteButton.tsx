import React, {MouseEvent} from 'react';
import {StarIcon} from '../../../../assets/icons/StarIcon';

type FavoriteButtonPropsType = {
    isFavorite: boolean
    addCallback: () => void
    deleteCallback: () => void
    dataElem: string
}

export const FavoriteButton = React.memo((props: FavoriteButtonPropsType) => {

    const {isFavorite, addCallback, deleteCallback, dataElem} = props

    const changeFavorite = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        isFavorite ? deleteCallback() : addCallback()
    }

    return (
        <span data-elem={dataElem} onClick={changeFavorite}>
            <StarIcon filled={isFavorite}/>
        </span>
    )
})