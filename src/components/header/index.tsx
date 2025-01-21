import { menuItem } from "@/interfaces/menu.i"
import { menu } from "./menu"
import styles from "./styles.module.scss"
import { useContext } from "react"
import { ReposContext } from "@/context/reposProvider"


export const Header: React.FC = () =>
{
    const reposApp = useContext(ReposContext)

    const handleClick = (item: menuItem) =>
    {   
        item.hasSearch ? reposApp.setHasSearch(true) : reposApp.setHasSearch(false)
    }   

    return (
        <nav className={styles.header}>
            <ul className={styles.list}>
                {menu.map((item: menuItem, key: number) => (
                    <li 
                        key={key}
                        className={styles.item}
                        onClick={() => handleClick(item)} 
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    )
}