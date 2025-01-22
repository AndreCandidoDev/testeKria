import Image from 'next/image';
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { checkFavorite, favoriteRepo, unFavoriteRepo } from "@/utils/favoriteFunctions";
import { dataRepo } from '@/interfaces/modalRepo.i';
import { useCookies } from 'react-cookie';
import { addDays } from 'date-fns';

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
        const expire = addDays(new Date(), 30)

        if(active)
        {
            setActive(false)
            const newCookie = unFavoriteRepo(data, cookie)
            setCookie("favorite", newCookie, {
                expires: expire
            })
            return
        }

        setActive(true)
        const newCookie = favoriteRepo(data, cookie)
        setCookie("favorite", newCookie, {
            expires: expire
        })
    }

    return (
        <div className={styles.favorite} onClick={handleClick}>
            <p>{active ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}</p>
            <Image    
                priority    
                src={active ? "/assets/FavoriteFill.svg" : "/assets/FavoriteEmpty.svg"}
                height={20}
                width={20}
                alt=""
            />
        </div>
    )
}