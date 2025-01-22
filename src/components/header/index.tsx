import { menu } from "./menu"
import styles from "./styles.module.scss"
import { useContext, useState } from "react"
import { ReposContext } from "@/context/reposProvider"

type menuItem = {
    label: string,
    hasSearch?: boolean
    value: number
}

export const Header: React.FC = () =>
{
    const reposApp = useContext(ReposContext)

    const [activeItem, setActiveItem] = useState<number>(0);

    const handleClick = (item: menuItem) =>
    {   
        setActiveItem(item.value)
        item.hasSearch ? reposApp.setHasSearch(true) : reposApp.setHasSearch(false)
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