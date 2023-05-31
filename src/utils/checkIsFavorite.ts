import {getFavoriteFromLS} from "./getFavoriteFromLS";

export const checkIsFavorite = (id: number) => {
    //функция для проверки, находится ли вакансия в favorite
    let favoritesArray: number[] = getFavoriteFromLS()
    return  favoritesArray.includes(id)
}