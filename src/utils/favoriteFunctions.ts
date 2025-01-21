export const favoriteRepo = (id: string) =>
{
    const storage = localStorage.getItem('favorite')

    if(storage)
    {
        const favorites = storage.split(",").filter((item: any) => item !== "")
        favorites.push(id)

        localStorage.setItem("favorite", favorites.join(","))
        return
    }

    localStorage.setItem("favorite", id + ",")
    
    return
}

export const unFavoriteRepo = (id: string) =>
{
    const storage = localStorage.getItem('favorite')

    const newFavorites = storage.split(",").filter((item: any) => item !== "" && item !== id)

    localStorage.setItem("favorite", newFavorites.join(","))

    return
}

export const checkFavorite = (id: string) =>
{
    const storage = localStorage.getItem('favorite')

    const newFavorites = storage.split(",").find((item: any) => item === id)

    if(newFavorites)
    {
        return true
    }

    return false
}