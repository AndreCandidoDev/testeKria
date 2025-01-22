import { menu } from "./menu"
import styles from "./styles.module.scss"
import { useContext, useEffect, useState } from "react"
import { ReposContext } from "@/context/reposProvider"

type menuItem = {
    label: string,
    hasSearch?: boolean
    isFavorite?: boolean
    allRepos: boolean
    value: number
}

export const Header: React.FC = () =>
{
    const reposApp = useContext(ReposContext)

    const [activeItem, setActiveItem] = useState<number>(0);

    useEffect(() => 
    {
        reposApp.setPage(1)
    }, [reposApp.allPublic])

    const handleClick = (item: menuItem) =>
    {   
        setActiveItem(item.value)
        item.hasSearch ? reposApp.setHasSearch(true) : reposApp.setHasSearch(false)
        item.isFavorite ? reposApp.setIsFavorite(true) : reposApp.setIsFavorite(false)
        !item.allRepos ? reposApp.setAllPublic(false) : reposApp.setAllPublic(true)
    }   

    return (
        <nav className={styles.header}>
            <ul className={styles.list}>
                {menu.map((item: menuItem, key: number) => (
                    <li 
                        key={key}
                        className={`${styles.item} ${item.value === activeItem ? styles.active : ''}`}
                        onClick={() => handleClick(item)} 
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    )
}