//функция для проверки, находится ли вакансия в favorite
export const checkIsFavorite = (id: number) => {
    const favorites = localStorage.getItem('favorites')
    let favoritesArray: number[] = favorites ? JSON.parse(favorites) : []
    return  favoritesArray.includes(id)
}