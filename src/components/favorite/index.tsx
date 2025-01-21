import Image from 'next/image';
import { useEffect, useState } from "react"
import { checkFavorite, favoriteRepo, unFavoriteRepo } from "@/utils/favoriteFunctions";

export const Favorite: React.FC<any> = ({ data }) =>
{
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => 
    {
        const storage = localStorage.getItem("favorite")

        if(storage && checkFavorite(String(data.id)))
        {
            setActive(true)
        }
        else
        {
            setActive(false)
        }
    }, [data])

    const handleClick = () =>
    {
        if(active)
        {
            setActive(false)
            return unFavoriteRepo(String(data.id))
        }

        setActive(true)
        return favoriteRepo(String(data.id))
    }

    return (
        <Image    
            style={{ cursor: 'pointer' }}    
            priority    
            src={active ? "/assets/FavoriteFill.svg" : "/assets/FavoriteEmpty.svg"}
            height={20}
            width={20}
            alt=""
            onClick={handleClick}
        />
    )
}