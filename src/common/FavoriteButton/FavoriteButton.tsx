import {MouseEvent} from "react";
import { StarIcon } from "../../assets/icons/StarIcon";

type FavoriteButtonPropsType = {
    isFavorite: boolean
    addCallback: () => void
    deleteCallback: () => void
    dataElem: string
}

export const FavoriteButton = (props: FavoriteButtonPropsType) => {

    const {
        isFavorite,
        addCallback,
        deleteCallback,
        dataElem,
    } = props

    const changeFavorite = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        if (isFavorite) {
            deleteCallback()
        } else {
            addCallback()
        }
    }

    return (
        <span data-elem={dataElem} onClick={changeFavorite}>
            <StarIcon filled={isFavorite}/>
        </span>
    )
}