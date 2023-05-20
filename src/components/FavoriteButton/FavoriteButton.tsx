import {StarIcon} from "../Icons/StarIcon";
import {MouseEvent} from "react";

type FavoriteButtonPropsType = {
    isFavorite: boolean
    addCallback: () => void
    deleteCallback: () => void
}

export const FavoriteButton = (props: FavoriteButtonPropsType) => {

    const {
        isFavorite,
        addCallback,
        deleteCallback,
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
        <span onClick={changeFavorite}>
            <StarIcon filled={isFavorite}/>
        </span>
    )
}