import Image from 'next/image';
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { checkFavorite, favoriteRepo, unFavoriteRepo } from "@/utils/favoriteFunctions";
import { dataRepo } from '@/interfaces/modalRepo.i';

interface FavoriteProps {
    data: dataRepo
}

export const Favorite: React.FC<FavoriteProps> = ({ data }) =>
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
            unFavoriteRepo(data)
            return
        }
        
        setActive(true)
        favoriteRepo(data)
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