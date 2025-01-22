import { dataRepo } from "@/interfaces/modalRepo.i"

export const favoriteRepo = (data: dataRepo) =>
{
    const storageData = localStorage.getItem('favorite')

    const id = String(data.id)

    const newData = JSON.parse(localStorage.getItem('favorite')) || {}

    if(storageData)
    {
        const favorites = { ...newData }
        favorites[id] = data
        
        localStorage.setItem("favorite", JSON.stringify(favorites))
    }
    else
    {
        newData[id] = data
        localStorage.setItem("favorite", JSON.stringify(newData))
    }
    
    return
}

export const unFavoriteRepo = (data: dataRepo) =>
{
    const storage = JSON.parse(localStorage.getItem('favorite'))

    const id = String(data.id)
    
    delete storage[id]

    localStorage.setItem("favorite", JSON.stringify(storage))

    return
}

export const checkFavorite = (id: string) =>
{
    const storage = JSON.parse(localStorage.getItem('favorite')) || {}

    const newFavorites = Object.keys(storage).find((item: any) => item === id)

    if(newFavorites)
    {
        return true
    }

    return false
}