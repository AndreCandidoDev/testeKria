import Image from 'next/image';
import { useEffect, useState } from "react"
import { checkFavorite, favoriteRepo, unFavoriteRepo } from "@/utils/favoriteFunctions";
import { dataRepo } from '@/interfaces/modalRepo.i';
import { useCookies } from 'react-cookie';

interface FavoriteProps {
    data: dataRepo
}

export const Favorite: React.FC<FavoriteProps> = ({ data }) =>
{
    const [active, setActive] = useState<boolean>(false)
    const [cookie, setCookie] = useCookies(['favorite'])

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
            const newCookie = unFavoriteRepo(data, cookie)
            setCookie("favorite", newCookie)
            return
        }

        setActive(true)
        const newCookie = favoriteRepo(data, cookie)
        setCookie("favorite", newCookie)
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