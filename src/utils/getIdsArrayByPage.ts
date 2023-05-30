import {getFavoriteFromLS} from "./getFavoriteFromLS";

export const getIdsArrayByPage = (pageNumber: number) => {
    //задаем начальные значения для array.slice, если страница 1
    let startAt = pageNumber - 1
    let endAt = startAt + 4

    //если страница больше 1, то цикл увеличивает начальные значения для array.slice
    for (let i = 1; i < pageNumber; i++) {
        startAt += 3
        endAt += 4
    }

    let favorites: number[] = getFavoriteFromLS()
    return favorites.slice(startAt, endAt)
}