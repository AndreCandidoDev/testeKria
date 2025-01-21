import { dataRepo } from "@/interfaces/modalRepo.i"

export const favoriteRepo = (data: dataRepo, cookie: any) =>
{
    const newCookie = {...cookie.favorite}

    const storage = localStorage.getItem('favorite')

    const id = String(data.id)

    newCookie[id] = data

    if(storage)
    {
        const favorites = storage.split(",").filter((item: any) => item !== "")

        favorites.push(id)
        
        localStorage.setItem("favorite", favorites.join(","))
    }
    else
    {
        localStorage.setItem("favorite", id + ",")
    }
    
    return newCookie
}

export const unFavoriteRepo = (data: dataRepo, cookie: any) =>
{
    const favoriteCookies = {...cookie.favorite}

    const storage = localStorage.getItem('favorite')
    
    const id = String(data.id)
    
    delete favoriteCookies[id]

    const newFavorites = storage.split(",").filter((item: any) => item !== "" && item !== id)

    localStorage.setItem("favorite", newFavorites.join(","))

    return favoriteCookies
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