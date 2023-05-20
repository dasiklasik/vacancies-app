import {StarIcon} from "../Icons/StarIcon";

type FavoriteButtonPropsType = {
    id: number
    isFavorite: boolean
    addCallback: (id: number) => void
    deleteCallback: (id: number) => void
}

export const FavoriteButton = (props: FavoriteButtonPropsType) => {

    const {
        id,
        isFavorite,
        addCallback,
        deleteCallback,
    } = props

    const changeFavorite = () => {
        if (isFavorite) {
            deleteCallback(id)
        } else {
            addCallback(id)
        }
    }

    return (
        <span onClick={changeFavorite}>
            <StarIcon filled={isFavorite}/>
        </span>
    )
}