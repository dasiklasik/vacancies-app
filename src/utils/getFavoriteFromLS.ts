export const getFavoriteFromLS = () => {
    let favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
}